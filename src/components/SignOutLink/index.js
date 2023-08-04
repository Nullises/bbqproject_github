import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as ROUTES from '../../constants/routes';
import Close from '../CustomIcons/Close';
import { withFirebase } from '../../services/Firebase';

const SignOutButton = ({ firebase }) => (
  <ListItem button component={Link} to={ROUTES.SIGN_IN} onClick={firebase.doSignOut}>
    <ListItemIcon>
        <Close />
      </ListItemIcon>
      <ListItemText primary="Cerrar Sesión" />
  </ListItem>
);

export default withFirebase(SignOutButton);