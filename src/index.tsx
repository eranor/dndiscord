// ----------------------
// IMPORTS

// React
import * as React from 'react';

// GraphQL
import { gql, graphql } from 'react-apollo';

// Material-ui components
import { CircularProgress, RaisedButton } from 'material-ui';

// Custom components
import Footer from './Footer';

// Styles
import './styles/styles.global.css';

import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Routing from './Routing/index';

const GetAllEncounersQuery = gql`
  query GetAllCharacters($first: Int) {
  viewer {
    allCharacters(first: $first) {
      edges {
        cursor
        node {
          id
          name
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`;

@graphql(GetAllEncounersQuery, () => ({ variables: { 'first': 2 } }))
class GraphQLMessage extends React.Component<any, any> {
  render() {
    const { data } = this.props;
    const characters = data.viewer && data.viewer.allCharacters.edges;
    const isLoading = data.loading ? 'yes' : 'nope';
    return (
      <div>
        <RaisedButton>Default</RaisedButton>
        {
          characters && characters.map((item: any, idx: any) =>
            <h2 key={idx}>Message from GraphQL server: <em>{item.node.name}</em></h2>,
          )
        }
        {data.loading ? <CircularProgress mode="indeterminate"/> : <h2>Currently loading?: {isLoading}</h2>}
      </div>
    );
  }
}

class App extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.setState({ 'isAuthenticated': false });
  }

  render() {
    return (
      <div>
        <Routing component="header"/>
        <main>
          <div className="container">
            <CSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500}
                                transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              <Routing component="main"/>
            </CSSTransitionGroup>
          </div>
        </main>
        <Footer/>

      </div>
    );
  }
}

export default App;