/**
 * Created by Ákos on 2017. 05. 06.
 */

import { gql } from 'react-apollo';

const CreateUserMutation = gql`
mutation CreateUserMutation($data: CreateUserInput!) {
  createUser(input: $data) {
    token
    changedUser {
      id
      username
      email
      lastName 
      firstName 
    }
  }
}`;
export default CreateUserMutation