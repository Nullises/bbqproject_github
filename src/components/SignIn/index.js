import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


const SignInLink = () => (
  <p>
    <Link to={ROUTES.SIGN_IN}>¿Ya tienes cuenta?</Link>
  </p>
);


export { SignInLink };