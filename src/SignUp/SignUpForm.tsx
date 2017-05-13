/**
 * Created by Ákos on 2017. 05. 06.
 */
import * as React from 'react';
import { Field, reduxForm, submit } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';
import { Validators } from 'src/utils';

class CustomField extends React.Component<any, any> {
  render() {
    const { input, label, type, meta: { touched, error }, ...custom } = this.props;
    return (
      <TextField fullWidth floatingLabelText={label} type={type} errorText={touched && error} {...input} {...custom}/>
    );
  }
}

const validate = (values: any) => {
  const errors: any = {};
  if (values.password !== values.passwordConfirm) {
    errors.password = 'The passwords are not maching!';
    errors.passwordConfirm = 'The passwords are not maching!'
  }
  return errors;
};

class SignUpForm extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);

  }

  render() {
    const { error, handleSubmit, buttonLabel } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12 l8 push-l2">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col s12">
                  <Field name="username" type="text" component={CustomField} label="Username"
                         validate={[Validators.minMaxLength(6, 32), Validators.required]}/>
                </div>
                <div className="col s12 m6">
                  <Field name="password" type="password" component={CustomField} label="Password"
                         validate={[Validators.required, Validators.minLength(8)]}/>
                </div>
                <div className="col s12 m6">
                  <Field name="passwordConfirm" type="password" component={CustomField}
                         validate={[Validators.required, Validators.minLength(8)]} label="Password confirmation"/>
                </div>
                <div className="col s12">
                  <Field name="email" type="email" component={CustomField} label="Email"
                         validate={Validators.email}/>
                </div>
                <div className="col s12 m6">
                  <Field name="firstName" type="text" component={CustomField} label="First Name"
                         validate={[Validators.maxLength(50)]}/>
                </div>
                <div className="col s12 m6">
                  <Field name="lastName" type="text" component={CustomField} label="Last Name"
                         validate={[Validators.maxLength(50)]}/>
                </div>
                {error && <strong>{error}</strong>}
              </div>
              <div className="row" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <RaisedButton label={buttonLabel} primary={true} type="submit"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
      ;
  }
}

export default reduxForm({
  form: 'signUpForm',
  validate,
})(SignUpForm);

