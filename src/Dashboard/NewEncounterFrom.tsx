import * as React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import CustomField from '../Login/CustomField';
import { Validators } from '../utils/index';
import { Card, CardText, CardHeader, CardActions, RaisedButton, FlatButton, List, ListItem, FloatingActionButton,
  SelectField,
  MenuItem } from 'material-ui';
import SelectCharacterForm from './SelectCharacterForm';

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

@reduxForm({form:'newEncounterForm'})
export default class NewEncounterFrom extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
  }

  renderCharacters = ({ fields, meta: { error, submitFailed } }: any) => {
    const { characters } = this.props;

    return (
      <Card>
        <CardHeader title="Characters"/>
        <CardText>
          {submitFailed && error && <ListItem><span>{error}</span></ListItem>}
          <List>
            {fields.map((character: any, index: any) => (
              <SelectCharacterForm characters={characters} character={character} index={index} fields={fields} />
            ))}
          </List>
          <FloatingActionButton mini={true} style={{ margin: '1rem' }} onTouchTap={() => fields.push({})}>
            <i className="material-icons">add</i>
          </FloatingActionButton>
        </CardText>
      </Card>
    )
  };

  renderRewards = ({ fields, meta: { error, submitFailed } }: any) => {
    const { rewards } = this.props;
    return (
      <Card>
        <CardHeader title="Rewards"/>
        <CardText>
          {submitFailed && error && <ListItem><span>{error}</span></ListItem>}
          <List>
            {fields.map((reward: any, index: any) => (
              <SelectCharacterForm rewards={rewards} index={index} fields={fields} reward={reward}/>
            ))}
          </List>
          <FloatingActionButton mini={true} style={{ margin: '1rem' }} onTouchTap={() => fields.push({})}>
            <i className="material-icons">add</i>
          </FloatingActionButton>
        </CardText>
      </Card>
    )
  };


  render() {
    const { handleSubmit, reset, submitting, pristine  } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Card initiallyExpanded={true} style={{ margin: '1rem' }}>
          <CardHeader title="Create Encounter"/>
          <CardText>
            <div className="row">
              <div className="col s12 m6">
                <Field name="name" type="text" component={CustomField} label="Encounter Name"
                       validate={[Validators.minMaxLength(4, 64), Validators.required]}/>
              </div>
              <div className="col s6 m3">
                <Field name="status" component={renderSelectField} label="Status" validate={Validators.required}>
                  <MenuItem value="visible" primaryText="Visible"/>
                  <MenuItem value="ended" primaryText="Ended"/>
                  <MenuItem value="hidden" primaryText="Hidden"/>
                </Field>
              </div>
              <div className="col s12 m6">
                <FieldArray name="characters" component={this.renderCharacters}/>
              </div>
              <div className="col s12 m6">
                <FieldArray name="rewards" component={this.renderRewards}/>
              </div>
            </div>
          </CardText>
          <CardActions>
            <RaisedButton type="submit" disabled={submitting}>Create</RaisedButton>
            <FlatButton type="button" disabled={pristine || submitting} onTouchTap={reset}>Reset</FlatButton>
          </CardActions>
        </Card>
      </form>
    )
  }
}