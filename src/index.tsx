// ----------------------
// IMPORTS

// React
import * as React from 'react';

// Custom components
import Footer from './Footer';

// Styles
import './styles/styles.global.css';

import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Routing from './Routing/index';

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