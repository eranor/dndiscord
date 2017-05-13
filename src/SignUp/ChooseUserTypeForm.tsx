/**
 * Created by Ákos on 2017. 05. 06.
 */
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RadioButtonGroup, RadioButton, RaisedButton } from 'material-ui';
import { Validators } from 'src/utils';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup {...input} {...rest}
                    valueSelected={input.value}
                    onChange={(event, value) => input.onChange(value)}/>
);

class SignUpForm extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);

  }

  render() {
    const { error, handleSubmit, buttonLabel } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <form onSubmit={handleSubmit}>
              <Field name="role" component={renderRadioGroup} validate={Validators.required} defaultSelected="Player">
                <RadioButton value="DM" label="Dungeon Master (DM)"/>
                <RadioButton value="Player" label="Player"/>
              </Field>
              {error && <strong>{error}</strong>}
              <div className="row" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <RaisedButton label={buttonLabel} primary={true} type="submit"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'chooseUserTypeForm',
})(SignUpForm);

