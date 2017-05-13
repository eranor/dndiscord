// Browser entry point, for Webpack.  We'll grab the browser-flavoured
// versions of React mounting, routing etc to hook into the DOM

// ----------------------
// IMPORTS

// Patch global.`fetch` so that Apollo calls to GraphQL work
import 'isomorphic-fetch';

// React parts
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Browser routing
import { BrowserRouter } from 'react-router-dom';

// Apollo Provider. This HOC will 'wrap' our React component chain
// and handle injecting data down to any listening component
import { ApolloProvider } from 'react-apollo';

// Grab the shared Apollo Client
import { browserClient } from 'kit/lib/apollo';

// Material UI Theme provider
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const injectTapEventPlugin = require('react-tap-event-plugin');

// Custom redux store creator.  This will allow us to create a store 'outside'
// of Apollo, so we can apply our own reducers and make use of the Redux dev
// tools in the browser
import createNewStore from 'kit/lib/redux';

// Root component.  This is our 'entrypoint' into the app.  If you're using
// the ReactQL starter kit for the first time, `src/app.js` is where
// you can start editing to add your own code
import App from 'src/index';

// ----------------------

// Create a new browser Apollo client
const client = browserClient();

// Create a new Redux store
const store = createNewStore(client);

// Create the 'root' entry point into the app.  If we have React hot loading
// (i.e. if we're in development), then we'll wrap the whole thing in an
// <AppContainer>.  Otherwise, we'll jump straight to the browser router
function doRender() {
  ReactDOM.render(
    <Root />,
    document.getElementById('main'),
  );
}

// The <Root> component.  We'll run this as a self-contained function since
// we're using a bunch of temporary vars that we can safely discard.
//
// If we have hot reloading enabled (i.e. if we're in development), then
// we'll wrap the whole thing in <AppContainer> so that our views can respond
// to code changes as needed
const Root = (() => {
  // Needed for onTouchTap
  // http://stackoverflow.com/a/34015469/988941
  injectTapEventPlugin();
  // Wrap the component hierarchy in <BrowserRouter>, so that our children
  // can respond to route changes

  const Chain = () => (
    <MuiThemeProvider>
      <ApolloProvider store={store} client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </MuiThemeProvider>
  );

  // React hot reloading -- only enabled in development.  This branch will
  // be shook from production, so we can run a `require` statement here
  // without fear that it'll inflate the bundle size
  if (module.hot) {
    // <AppContainer> will respond to our Hot Module Reload (HMR) changes
    // back from WebPack, and handle re-rendering the chain as needed
    const AppContainer = require('react-hot-loader').AppContainer;

    // Start our 'listener' at the root component, so that any changes that
    // occur in the hierarchy can be captured
    module.hot.accept('src/index', () => {
      // Refresh the entry point of our app, to get the changes.

      // eslint-disable-next-line
      require('src/index').default;

      // Re-render the hierarchy
      doRender();
    });

    return () => (
      <AppContainer>
        <Chain />
      </AppContainer>
    );
  }
  return Chain;
})();

doRender();
