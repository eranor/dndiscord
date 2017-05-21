/**
 * Created by Ákos on 2017. 05. 11.
 */

import { gql } from 'react-apollo';

const AddUserToRoleMutation = gql`
mutation AddUserToRoleMutation($data: AddToUserRolesConnectionInput!) {
  addToUserRolesConnection(input: $data) {
      changedUserRoles{
        role{
          id
          name
        }
        user{      
          id
          username
        }
      }
  }
}`;
export default AddUserToRoleMutation
