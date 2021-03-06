/**
 * Created by Ákos on 2017. 05. 03.
 */
import * as React from 'react';
import { Paper } from 'material-ui';
import { Stepper, StepLabel, Step } from 'material-ui/Stepper';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import CreateUserMutation from './CreateUserMutation';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import SignUpForm from './SignUpForm';
import ChooseUserTypeForm from './ChooseUserTypeForm';
import { SubmissionError } from 'redux-form';
import { errorsDict } from './errors';
import AddAccountType from './AddRoleToUserMutation';

class SignUp extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0
    };
  }

  getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="row">
            <div className="col s12">
              <SignUpForm onSubmit={this.submit} buttonLabel="Submit"/>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="row">
            <div className="col s8 offset-s1">
              <h3>Your Profile has been created.</h3>
              <p>Please choose if you want to be:</p>
              <ChooseUserTypeForm onSubmit={this.submit} buttonLabel="Finish"/>
            </div>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  };

  submit = (args: any) => {
    const { stepIndex } = this.state;
    switch (stepIndex) {
      case 0: {
        return this.props.signUp({
          username: args.username, password: args.password, email: args.email, firstName: args.firstName,
          lastName: args.lastName
        }).then(({ data }: any) => {
          if (!data.errors) {
            localStorage.setItem('user', JSON.stringify(data.createUser.changedUser));
            localStorage.setItem('token', data.createUser.token);
            this.setState({
              errors: [],
              loading: false,
              stepIndex: stepIndex + 1,
              finished: stepIndex > 2
            })
          } else {
            console.log(data.errors);
          }
        }).catch((errors: any) => {
          console.log(errors);
          throw new SubmissionError(errorsDict[errors.message]);
        });
      }
      case 1: {
        const user = JSON.parse(localStorage.getItem('user')!);
        return this.props.addRole({
          accountType: args.role, id: user.id
        }).then(({ data }: any) => {
          if (!data.errors) {
            localStorage.setItem('user', JSON.stringify(data.updateUser.changedUser));
            this.setState({ errors: [] });
            this.setState({
              loading: false,
              stepIndex: stepIndex + 1,
              finished: stepIndex > 2
            });
            this.props.history.push('/dashboard');
          } else {
            console.log(data.errors);
          }
        }).catch((errors: any) => {
          throw new SubmissionError(errorsDict[errors.message]);
        })
      }
      default: {
        console.log('You shouldn\'t be here')
      }
    }
  };

  renderContent = () => {
    const { finished, stepIndex } = this.state;
    if (finished) {
      return (
        <p>
          <a href="#" onClick={(event) => {
            event.preventDefault();
            this.setState({ stepIndex: 0, finished: false });
          }}>
            Click here
          </a> to reset the example.
        </p>
      );
    }

    return (
      <div>
        <div>{this.getStepContent(stepIndex)}</div>
      </div>
    );
  };

  public render(): any {
    const { loading, stepIndex } = this.state;
    return (
      <div>
        <Helmet>
          <title>SignUp</title>
        </Helmet>
        <Paper zDepth={3} rounded={false}>
          <div className="container" style={{ paddingTop: '1rem' }}>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Sign Up</StepLabel>
              </Step>
              <Step>
                <StepLabel>Choose a role</StepLabel>
              </Step>
            </Stepper>
            <ExpandTransition loading={loading} open={true}>
              {this.renderContent()}
            </ExpandTransition>
          </div>
        </Paper>
      </div>
    )
  }
}

const CreateUserWithData = graphql(CreateUserMutation, {
  props: ({ mutate }) => ({
    signUp: (data: any) => mutate({ variables: { data } })
  })
})(connect()(withRouter(SignUp)));

const AddRoleToUser = graphql(AddAccountType, {
  props: ({ mutate }) => ({
    addRole: (data: any) => mutate({ variables: { data } })
  })
})(CreateUserWithData);
export default AddRoleToUser;