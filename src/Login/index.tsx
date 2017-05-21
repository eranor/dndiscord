/**
 * Created by Ákos on 2017. 05. 03.
 */
import * as React from 'react';
import { Paper } from 'material-ui';
import { Helmet } from 'react-helmet';
import LoginForm from './LoginForm';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import LoginUserMutation from './LoginUserQuery';
import { errorsDict } from '../SignUp/errors';

class Login extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      errors: []
    }
  }

  submit = (values: any) => {
    return this.props.login({
      username: values.username,
      password: values.password
    }).then(({ data }: any) => {
      if (!data.errors) {
        localStorage.setItem('token', data.loginUser.token);
        localStorage.setItem('user', JSON.stringify(data.loginUser.user));
        this.setState({ errors: [] });
        this.props.history.push('/dashboard');
      } else {
        console.log(data.errors);
      }
    }).catch((errors: any) => {
      throw new SubmissionError(errorsDict[errors.message]);
    });
  };

  public render(): any {
    return (
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Paper zDepth={3} rounded={false}>
          <div className="container" style={{ paddingTop: '1rem' }}>
            <div className="row">
              <h1 className="center-align">Log in</h1>
              <div className="col s10 push-s1 m8 push-m2 l6 push-l3">
                <LoginForm onSubmit={this.submit}/>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}

const LoginWithData = graphql(LoginUserMutation, {
  props: ({ mutate }) => ({
    login: (data: any) => mutate({
      variables: {
        data
      }
    })
  })
})(Login);

export default withRouter(LoginWithData);
