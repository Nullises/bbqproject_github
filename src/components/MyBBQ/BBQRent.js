import moment from 'moment';
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';
import Modal from '@material-ui/core/Modal';
import ModalStyle from '../../styles/ModalBBQRent';
import LocalDining from '../CustomIcons/LocalDining';
import { withFirebase } from '../../services/Firebase';
import * as ROUTES from '../../constants/routes';
import { useInput } from "../../hooks/useInput";


function BBQRent(props) {

    console.log('PROPS IN BBQRENT', props);

    const [selectedDateFrom, handleDateChangeFrom] = useState(new Date());
    const [selectedDateTo, handleDateChangeTo] = useState(new Date());

    const classes = ModalStyle();

    let bbqObj = {
        rented: true,
        dateRentFrom: moment(selectedDateFrom).format("YYYY-MM-DDTHH:mm"),
        dateRentTo: moment(selectedDateTo).format("YYYY-MM-DDTHH:mm")
    };


    const handleSubmit = (evt) => {

        evt.preventDefault();
        props.firebase
        .doUpdateBBQInDB(props.id, bbqObj)
        .then(bbq => {
            props.handlerClose();
        })
        .catch(error => {
          alert(error);
        });
        
        props.fetch();
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                       <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker label="Desde" value={selectedDateFrom} onChange={handleDateChangeFrom} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker label="Hasta" value={selectedDateTo} onChange={handleDateChangeTo} />
                            </Grid>                            
                        </MuiPickersUtilsProvider> 
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Alquilar
          </Button>
                </form>
            </div>
        </Container>
    );
}

const BBQForm = compose(
    withRouter,
    withFirebase,
)(BBQRent);

export default BBQForm;