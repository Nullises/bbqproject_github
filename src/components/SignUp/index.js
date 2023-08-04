import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';



const SignUpLink = () => (
  <p>
    ¿Sin cuenta? <Link to={ROUTES.SIGN_UP}>¡Regístrate!</Link>
  </p>
);

export { SignUpLink };