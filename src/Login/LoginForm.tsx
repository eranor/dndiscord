/**
 * Created by Ákos on 2017. 05. 06.
 */
import * as React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';
import { Validators } from '../utils/index';

class CustomField extends React.Component<any, any> {
  render() {
    const { input, label, type, meta: { touched, error }, ...custom } = this.props;
    return (
      <TextField fullWidth floatingLabelText={label} type={type} errorText={touched && error} {...input} {...custom}/>
    );
  }
}

class LoginForm extends React.Component<any, any> {
  render() {
    const { handleSubmit, error, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Field name="username" type="text" component={CustomField} label="Username"
                 validate={[Validators.required, Validators.minMaxLength(6, 32)]}/>
          <Field name="password" type="password" component={CustomField} label="Password"
                 validate={[Validators.required, Validators.minLength(8)]}/>
          {error && <strong>{error}</strong>}
        </div>
        <div className="row" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <RaisedButton type="submit" label="Submit" disabled={submitting}/>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm);

