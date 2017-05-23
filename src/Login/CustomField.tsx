/**
 * Created by Ákos on 2017. 05. 23.
 */

import * as React from 'react';
import { TextField } from 'material-ui';

export default class CustomField extends React.Component<any, any> {
  render() {
    const { input, label, type, meta: { touched, error } } = this.props;
    return (
      <TextField fullWidth floatingLabelText={label} type={type}
                 errorText={touched && error} {...input} {...this.props.custom}/>
    );
  }
}