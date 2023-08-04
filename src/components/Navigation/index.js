import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = ({ authUser }) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Cuenta</Link>
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Iniciar Sesión</Link>
    </li>
  </ul>
);

export default Navigation;