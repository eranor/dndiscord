/**
 * Created by Ákos on 2017. 05. 06.
 */

import { gql } from 'react-apollo';

const LoginUserQuery = gql`
  mutation LoginUserQuery ($data: LoginUserInput!) {
  loginUser(input: $data) {
    token
    user {
      id
      username
      createdAt
    }
  }
}`;
export default LoginUserQuery