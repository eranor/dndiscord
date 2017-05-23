/**
 * Created by Ákos on 2017. 05. 11.
 */

import { gql } from 'react-apollo';

const AddAccountType = gql`
mutation AddAccountType($data: UpdateUserInput!){
  updateUser(input:$data){
    changedUser{
      id
      username
      firstName
      lastName
      email
      lastLogin
      accountType
      roles{
        edges{
          node{
            id
            name
          }
        }
      }      
    }
  }
}`;
export default AddAccountType
