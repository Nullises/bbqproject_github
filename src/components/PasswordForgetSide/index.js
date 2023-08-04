import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LocalDining from '../CustomIcons/LocalDining'
import Typography from '@material-ui/core/Typography';
import PasswordForgetSideStyle from '../../styles/PasswordForgetSide';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignInLink } from '../SignIn';
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


function PasswordForgetSide(props) {
    const classes = PasswordForgetSideStyle();
    
    const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');

    const isInvalid = email === '';

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.firebase
        .doPasswordReset(email)
        .then(() => {
          resetEmail();
          props.history.push(ROUTES.SIGN_IN);
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
                    <Button
                        disabled={isInvalid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Recuperar Contraseña
                    </Button>
                    <Grid container>
                        <Grid item>
                            <SignInLink variant="body2" />
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

const PasswordForgetForm = compose(
    withRouter,
    withFirebase,
)(PasswordForgetSide);

export default PasswordForgetForm 

