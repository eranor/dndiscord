import * as React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { AppBar, IconButton, FlatButton, RaisedButton, Divider, } from 'material-ui';
import { Link, withRouter } from 'react-router-dom';
import * as sass from '../styles/styles.scss';
import { Helmet } from 'react-helmet';

class Header extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  logoutUser = () => {
    localStorage.clear();
    this.props.history.push('/');
  };

  public render() {
    const { title } = this.props;
    return (
      <header>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content="D&D Manager"/>
        </Helmet>
        <AppBar className={sass.appBar}
                title={<span className={sass.appBarTitle}>
                  <Link className="breadcrumb" to="/">D&amp;D Manager</Link>
                  {title && <a href="#!" className="breadcrumb">{title}</a>}
                </span>}
                onLeftIconButtonTouchTap={this.handleToggle}
                iconElementLeft={<IconButton> <i className="material-icons">menu</i> </IconButton>}
                iconElementRight={
                  localStorage.token ?
                    <div className="hide-on-small-only"><RaisedButton onClick={this.logoutUser} label="Logout"/></div> :
                    <div className="hide-on-small-only">
                      <Link to='/signup'><RaisedButton label='Sign up'/></Link>
                      <Link to='/login'><FlatButton label='Login'/></Link>
                    </div>
                }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          {localStorage.token ?
            <div>
              <div className="hide-on-med-and-up">
                <MenuItem onTouchTap={this.logoutUser}>Logout</MenuItem>
                <Divider/>
              </div>
              <Link to="/dashboard"><MenuItem onTouchTap={this.handleClose}>Dashboard</MenuItem></Link>
              <Link to="/settings"><MenuItem onTouchTap={this.handleClose}>Settings</MenuItem></Link>
            </div> :
            <div className="hide-on-med-and-up">
              <Link to='/signup'><MenuItem onTouchTap={this.handleClose}>Sign up</MenuItem></Link>
              <Link to='/login'><MenuItem onTouchTap={this.handleClose}>Login</MenuItem></Link>
            </div>
          }

        </Drawer>
      </header>
    )
  }
}

export default withRouter(Header);