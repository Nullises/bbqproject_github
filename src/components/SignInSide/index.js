import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SignInSideStyle from '../../styles/SignInSide';
import LocalDining from '../CustomIcons/LocalDining'

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../../services/Firebase';
import * as ROUTES from '../../constants/routes';

import { useInput } from "../../hooks/useInput";

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Hecho con amor por: '}
            <Link color="inherit" href="https://www.linkedin.com/in/nullises/">
                Ulises Vargas Se Sousa
      </Link>
        </Typography>
    );
}


function SignInSide(props) {
    const classes = SignInSideStyle();
    
    const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');

    const isInvalid = password === '' || email === '';

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          resetEmail();
          resetPassword();;
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
                        {...bindPassword}
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
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
                        Iniciar Sesión
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <PasswordForgetLink variant="body2" />
                        </Grid>
                        <Grid item>
                            <SignUpLink variant="body2" />
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <MadeWithLove />
                    </Box>
                </form>
            </div>
        </Grid>
    </Grid>
    );
  }

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInSide);

export default SignInForm 

