






import { Field } from 'redux-form';
import { SelectField, MenuItem, FlatButton } from 'material-ui';
import * as React from 'react';

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }: any) => (
  <SelectField floatingLabelText={label}
               errorText={touched && error}
               {...input}
               onChange={(event, index, value) => input.onChange(value)}
               children={children}
               {...custom}
  />
);

export default class SelectCharacterForm extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
  }

  fabstyle = {
    margin: '1rem',
    minWidth: '36px',
    lineHeight: 'inherit',
    width: '50%'
  };

  render() {
    const { index, fields, characters, character } = this.props;
    const characterTypes = ['Player', 'NPC', 'Enemy'];
    return (
      <div className="row">
        <div className="col s12 m5">
          <Field name={`${character}.character`} component={renderSelectField} label="Character">
            {characters.map((item: any, index: any) =>
              <MenuItem key={index} value={item} primaryText={`${item.firstName} ${item.LastName +" "}- (${item.class})`}/>
            )}
          </Field>
        </div>
        <div className="col s12 m5">
          <Field name={`${character}.type`} component={renderSelectField} label="Type">
            {characterTypes.map((item: any, index: any) =>
              <MenuItem key={index} value={item} primaryText={item}/>
            )}
          </Field>
        </div>
        <div className="col s12 m2">
          <div className="valign-wrapper">
            <FlatButton style={this.fabstyle} onTouchTap={() => fields.remove(index)}>
              <i className="material-icons">remove</i>
            </FlatButton>
          </div>
        </div>
      </div>
    )
  }
}
