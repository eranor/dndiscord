import { gql } from 'react-apollo';

const ListCharactersQuery = gql`
query ListCharactersQuery($first: Int, $where: CharacterWhereArgs!){
  viewer{
    allCharacters(where:$where, first: $first){
      edges{
        cursor
        node{
          firstName
          lastName
          level
          class
          subclass
          race
          subrace
          sex
          height
          type
            age
          createdBy{
            id
            username
          }
        }
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
    }
  }
}`;
export default ListCharactersQuery