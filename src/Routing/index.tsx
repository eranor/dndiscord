import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/index';
import Home from '../Home/index';
import Login from '../Login/index';
import SignUp from '../SignUp/index';
import Dashboard from '../Dashboard/index';
import Settings from '../Settings/index';
import NotFoundPage from '../NotFound/index';


const routes: Array<any> = [
  {
    path: '/',
    exact: true,
    protectedPath: false,
    header: () => <Header/>,
    main: () => <Home/>,
  },
  {
    path: '/login',
    protectedPath: false,
    header: () => <Header title="Login"/>,
    main: () => <Login title="Login"/>,
  },
  {
    path: '/signup',
    protectedPath: false,
    header: () => <Header title="Registration"/>,
    main: () => <SignUp title="Registration"/>,
  },
  {
    path: '/dashboard',
    protectedPath: true,
    header: () => <Header title="Dashboard"/>,
    main: () => <Dashboard title="Dashboard"/>,
  },
  {
    path: '/settings',
    protectedPath: true,
    header: () => <Header title="Settings"/>,
    main: () => <Settings title="Settings"/>,
  },
  {
    protectedPath: false,
    header: () => <Header title="Page not found"/>,
    main: () => <NotFoundPage title="Page not found"/>,
  },
];

class PrivateRoute extends React.PureComponent<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    const { auth, component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {
        if (!auth || !!localStorage.getItem('token')) {
          return <Component {...props}/>;
        } else {
          const Redirect = require('react-router').Redirect;
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>;
        }
      }}/>
    )
  }
}

const Routing = ({ component }: any) => (
  <Switch>
    {routes.map(
      (route: any, index: number) => (
        <PrivateRoute auth={route.protectedPath} key={index} path={route.path} exact={route.exact}
                      component={route[component]}/> ))}
  </Switch>
);
export default Routing;