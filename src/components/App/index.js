import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
/** CONTEXTS  */
import { withAuthentication } from '../Session';
import { AuthUserContext } from '../Session';


import SignInSide from '../SignInSide';
import SignUpSide from '../SignUpSide';
import PasswordForgetSide from '../PasswordForgetSide';
import Dashboard from '../Dashboard';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <Router>
        
          <div>
            <Route path='/' exact component={SignInSide} />
            <Route path={ROUTES.SIGN_UP} exact component={SignUpSide} />
            <Route path={ROUTES.SIGN_IN} exact component={SignInSide} />
            <Route path={ROUTES.PASSWORD_FORGET} exact component={PasswordForgetSide} />
            <Route path={ROUTES.HOME} exact component={Dashboard} />
            <Route path={ROUTES.ACCOUNT} exact component={AccountPage} />
            <Route path={ROUTES.ADMIN} exact component={AdminPage} />
          </div>
        </Router>
      </AuthUserContext.Provider>  
    );
  }
}

export default withAuthentication(App);