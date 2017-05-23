/**
 * Created by Ákos on 2017. 05. 06.
 */
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RadioButtonGroup, RadioButton, RaisedButton } from 'material-ui';
import { Validators } from 'src/utils';
//import { graphql } from 'react-apollo';
//import { gql } from 'react-apollo';

/*const GetRoleIDByNameQuery = gql`
 query GetRoleIDByNameQuery($data: RoleWhereArgs!) {
 viewer {
 allRoles(where: $data) {
 edges {
 node {
 id
 name
 }
 }
 }
 }
 }`;
 */
const renderRadioGroup = ({ input, ...rest }: any) => {
  rest;
  return (
    <RadioButtonGroup {...input} {...rest} valueSelected={input.value}
                      onChange={(event, value) => input.onChange(value)}/>
  );
};

//@graphql(GetRoleIDByNameQuery, () => ({ variables: { first: 2 } }))
class SignUpForm extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      roles: [
        { node: { id: 'Um9sZToy', name: 'DM' } },
        { node: { id: 'Um9sZTox', name: 'Player' } }
      ]
    }

  }

  render() {
    const { error, handleSubmit, buttonLabel, submitting } = this.props;
    const { roles } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <form onSubmit={handleSubmit}>
              <Field name="role" component={renderRadioGroup} validate={Validators.required} defaultSelected="Player">
                {
                  roles && roles.map((item: any, idx: any) =>
                    <RadioButton key={idx} value={item.node.name} label={item.node.name}/>
                  )
                }
              </Field>
              {error && <strong>{error}</strong>}
              <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RaisedButton label={buttonLabel} disabled={submitting} primary={true} type="submit"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'chooseUserTypeForm'
})(SignUpForm);

