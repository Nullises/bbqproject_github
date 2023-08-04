import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LocalDining from '../CustomIcons/LocalDining'
import Typography from '@material-ui/core/Typography';
import SignUpSideStyle from '../../styles/SignUpSide';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignInLink } from '../SignIn';
import { withFirebase } from '../../services/Firebase';
import * as ROUTES from '../../constants/routes';

import { useInput } from "../../hooks/useInput";

function SignUpSide(props) {
    const classes = SignUpSideStyle();
    
    const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
    const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
    const { value:passwordOne, bind:bindPasswordOne, reset:resetPasswordOne } = useInput('');
    const { value:passwordTwo, bind:bindPasswordTwo, reset:resetPasswordTwo } = useInput('');

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          let user = props.firebase.auth.currentUser;
          user.updateProfile({
            displayName: username
          });
          resetUsername();
          resetEmail();
          resetPasswordOne();
          resetPasswordTwo();
          props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          alert(error);
        });
    }

    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LocalDining />
                </Avatar>
                <Typography component="h1" variant="h5">
                    BBQ PROJECT
          </Typography>
                <form className={classes.form} noValidate>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        {...bindUsername}
                        label="Nombre de usuario"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        {...bindEmail}
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        {...bindPasswordOne}
                        name="passwordOne"
                        label="Contraseña"
                        type="password"
                        id="passwordOne"
                        autoComplete="current-password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        {...bindPasswordTwo}
                        name="passwordTwo"
                        label="Repita Contraseña"
                        type="password"
                        id="passwordTwo"
                        autoComplete="current-password"
                    />
                    <Button
                        disabled={isInvalid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Registrarse
                    </Button>
                    <Grid container>
                        <Grid item>
                            <SignInLink variant="body2" />
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Grid>
    </Grid>
    );
  }

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpSide);

export default SignUpForm;
