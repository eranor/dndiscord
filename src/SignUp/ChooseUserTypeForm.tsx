/**
 * Created by Ákos on 2017. 05. 06.
 */
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RadioButtonGroup, RadioButton, RaisedButton, CircularProgress } from 'material-ui';
import { Validators } from 'src/utils';
import { graphql } from 'react-apollo';
import { gql } from 'react-apollo';

const GetRoleIDByNameQuery = gql`
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

const renderRadioGroup = ({ input, ...rest }: any) => {
  rest;
  return (
    <RadioButtonGroup {...input} {...rest} valueSelected={input.value}
                      onChange={(event, value) => input.onChange(value)}/>
  );
};

@graphql(GetRoleIDByNameQuery, () => ({ variables: { first: 2 } }))
class SignUpForm extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);

  }

  render() {
    const { data, error, handleSubmit, buttonLabel, submitting } = this.props;
    const roles = data.viewer && data.viewer.allRoles.edges;
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <form onSubmit={handleSubmit}>
              {data.loading ? <CircularProgress mode="indeterminate"/> :
                <Field name="role" component={renderRadioGroup} validate={Validators.required} defaultSelected="Player">
                  {
                    roles && roles.map((item: any, idx: any) =>
                      <RadioButton key={idx} data-id={item.node.id} value={item.node.name} label={item.node.name}/>
                    )
                  }
                </Field>
              }
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

