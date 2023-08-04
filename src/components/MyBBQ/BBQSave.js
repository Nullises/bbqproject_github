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
import ImageUploader from 'react-images-upload';
import BBQSaveStyle from '../../styles/BBQSave';
import LocalDining from '../CustomIcons/LocalDining';
import { withFirebase } from '../../services/Firebase';
import * as ROUTES from '../../constants/routes';
import { useInput } from "../../hooks/useInput";
import FlipMove from 'react-flip-move';

function BBQSave(props) {

    const { value:zipcode, bind:bindZipcode, reset:resetZipcode } = useInput('');
    const { value:name, bind:bindName, reset:resetName } = useInput('');
    const { value:description, bind:bindDescription, reset:resetDescription } = useInput('');
    const { value:model, bind:bindModel, reset:resetModel } = useInput('');

    const [state, setState] = React.useState({
        pictures: [],
        picturesUrl: [],
        uploadValue: 0,
        lat: props.center.lat,
        lng: props.center.lng,
        rent: false,
    });
    
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const onDrop = (pictureFiles, pictureDataURLs) => {
        state.pictures = pictureFiles;
        state.pictures.map((item, i) => {
            const file = item;
            var storage = props.firebase.getStorage();
            /** Save File */
            storage.child(file.name).put(file).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
                state.picturesUrl.push(snapshot.metadata.fullPath)
            });
        });
    }



    const [selectedDateFrom, handleDateChangeFrom] = useState(new Date());
    const [selectedDateTo, handleDateChangeTo] = useState(new Date());

    const classes = BBQSaveStyle();

    let bbqObj = {
        address: props.address,
        gp: [state.lat, state.lng], 
        name: name,
        description: description,
        model: model,
        dateRentFrom: state.rent ? moment(selectedDateFrom).format("YYYY-MM-DDTHH:mm") : '',
        dateRentTo: state.rent ? moment(selectedDateTo).format("YYYY-MM-DDTHH:mm") : '',
        rented: state.rent,
        userId: props.firebase.auth.currentUser.uid,
        zipcode: zipcode,
        photos: state.picturesUrl
    };

    const handleSubmit = (evt) => {

        evt.preventDefault();
        props.firebase
        .doCreateBBQInDB(bbqObj)
        .then(bbq => {
            console.log(bbq);
            resetDescription();
            resetModel();
            resetName();
            resetZipcode();
        })
        .catch(error => {
          alert(error);
        });
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LocalDining />
                </Avatar>
                <Typography component="h1" variant="h5">
                    BBQ
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid item xs={12}>
                    <ImageUploader
                                withIcon={true}
                                buttonText='Subir Imágenes'
                                onChange={onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                    />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                autoComplete="lat"
                                name="lat"
                                variant="outlined"
                                required
                                fullWidth
                                id="lat"
                                value={state.lat}
                                label="Latitud"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={state.lng}
                                id="lng"
                                label="Longitud"
                                name="lng"
                                autoComplete="lng"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="zipcode"
                                label="Código Postal"
                                name="zipcode"
                                autoComplete="zipcode"
                                {...bindZipcode}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="address"
                                label="Dirección"
                                name="address"
                                autoComplete="address"
                                value={props.address}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                name="name"
                                autoComplete="name"
                                {...bindName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="model"
                                label="Modelo"
                                name="model"
                                autoComplete="model"
                                {...bindModel}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="description"
                                label="Descripción"
                                name="description"
                                autoComplete="description"
                                {...bindDescription}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControlLabel
                            control={
                            <Switch checked={state.rent} onChange={handleChange('rent')} value="rent" />
                            }
                            label="¿Alquilar BBQ?"
                        />
                        </Grid>
                        {state.rent ? <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker label="Desde" value={selectedDateFrom} onChange={handleDateChangeFrom} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker label="Hasta" value={selectedDateTo} onChange={handleDateChangeTo} />
                            </Grid>                            
                        </MuiPickersUtilsProvider> : '' }
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        GUARDAR BBQ
          </Button>
                </form>
            </div>
        </Container>
    );
}

const BBQForm = compose(
    withRouter,
    withFirebase,
)(BBQSave);

export default BBQForm;