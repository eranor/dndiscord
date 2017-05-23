import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../Login/CustomField';
import { Validators } from '../utils/index';
import {
  Card, CardText, CardHeader, CardActions, RaisedButton, FlatButton, RadioButtonGroup, SelectField, MenuItem,
  RadioButton
} from 'material-ui';

const renderRadioGroup = ({ input, ...rest }:any) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }:any) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

@reduxForm({ form: 'newCharacterForm' })
export default class NewCharacterForm extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    const { handleSubmit, reset, submitting, pristine } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Card initiallyExpanded={true} style={{ margin: '1rem' }}>
          <CardHeader title="Create Character"/>
          <CardText>
            <div className="row">
              <div className="col s12 m6">
                <Field name="firstName" type="text" component={CustomField} label="First Name"
                       validate={[Validators.minMaxLength(4, 64), Validators.required]}/>
              </div>
              <div className="col s12 m6">
                <Field name="lastName" type="text" component={CustomField} label="Last Name"
                       validate={[Validators.minMaxLength(4, 64)]}/>
              </div>
              <div className="col s12 m6">
                <Field name="class" type="text" component={CustomField} label="Class"
                       validate={[Validators.minMaxLength(4, 64), Validators.required]}/>
              </div>
              <div className="col s12 m6">
                <Field name="subclass" type="text" component={CustomField} label="Subclass"
                       validate={[Validators.minMaxLength(4, 64)]}/>
              </div>
              <div className="col s12 m6">
                <Field name="race" type="text" component={CustomField} label="Race"
                       validate={[Validators.minMaxLength(4, 64)]}/>
              </div>
              <div className="col s12 m6">
                <Field name="subrace" type="text" component={CustomField} label="Subrace"
                       validate={[Validators.minMaxLength(4, 64)]}/>
              </div>
              <div className="col s6 m3">
                <Field name="sex" component={renderRadioGroup}>
                  <RadioButton value="male" label="male"/>
                  <RadioButton value="female" label="female"/>
                  <RadioButton value="other" label="other"/>
                </Field>
              </div>
              <div className="col s6 m3">
                <Field name="type" component={renderSelectField} label="Type" validate={Validators.required}>
                  <MenuItem value="player" primaryText="Player"/>
                  <MenuItem value="enemy" primaryText="Enemy"/>
                  <MenuItem value="npc" primaryText="NPC (Non player character)"/>
                </Field>
              </div>
              <div className="col s6 m3">
                <Field name="age" type="number" component={CustomField} label="Age"
                       validate={[Validators.minMaxLength(4, 64)]}/>
              </div>
              <div className="col s6 m3">
                <Field name="height" type="text" component={CustomField} label="Height"
                       validate={[Validators.minMaxLength(4, 64)]}/>
              </div>
              <div className="col s12 m6">
                <Field name="backgrount" type="text" component={CustomField} label="Background"
                       validate={[Validators.minMaxLength(4, 64)]}/>
              </div>
            </div>
          </CardText>
          <CardActions>
            <RaisedButton type="submit" disabled={submitting} >Create</RaisedButton>
            <FlatButton type="button" disabled={pristine || submitting} onTouchTap={reset}>Reset</FlatButton>
          </CardActions>
        </Card>
      </form>
    )
  }
}