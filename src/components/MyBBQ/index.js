import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MyBBQStyle from '../../styles/myBBQ';
import Modal from '@material-ui/core/Modal';
import Tooltip from '@material-ui/core/Tooltip';
import BBQRent from '../MyBBQ/BBQRent';

const defaultImgUrl = 'https://firebasestorage.googleapis.com/v0/b/bbqproject-73dbe.appspot.com/o/001.png?alt=media&token=43fd5f2c-2e1a-40f0-a803-8a6931d9de0b'


function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    };
}

function MyBBQPage(props) {

    const classes = MyBBQStyle();

    const [data, dataSet] = useState([])

    async function fetchMyAPI() {
        let response = await props.firebase.searchBBQInDBByUid(props.firebase.auth.currentUser.uid);
        dataSet(response)
    }
  
    useEffect(() => {
        fetchMyAPI();
    }, []);



    const handleDelete = (i) => {
        props.firebase
            .deleteBBQInDBById(i.id);
        fetchMyAPI();
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = (evt) => {
        evt.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [modalStyle] = React.useState(getModalStyle);

    return (
        <div>
            {data.map((item, i) => 
                <Card key={i} className={classes.card}>
                    <CardActionArea id="simple-modal-description">
                        <CardMedia
                            component="img"
                            alt="Punto de barbacoa"
                            height="90"
                            image={item.data.photos ? 
                            `https://firebasestorage.googleapis.com/v0/b/bbqproject-73dbe.appspot.com/o/${item.data.photos[0]}?alt=media` :
                             defaultImgUrl}
                            title={item.data.name ? item.data.name : 'Punto de barbacoa'}
                            className={classes.media}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.data.name} - {item.data.model}
                            </Typography>
                            <Typography variant="body2" color="primary" component="p">
                            {
                                item.data.rented ? `Desde: ${moment(item.data.dateRentFrom).format('DD-MM-YYYY')} - Hasta: ${moment(item.data.dateRentTo).format('DD-MM-YYYY')}` : '' 
                            }
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.data.address}
                            </Typography>
                            {item.data.description}
                        </CardContent>
                    </CardActionArea>
                        <CardActions>
                            {item.data.rented ? 
                               <Tooltip title="Ya se encuentra alquilado">
                                   <span>
                                    <Button size="small" color="primary" disabled>
                                        Alquilar
                                    </Button>
                                   </span>
                                </Tooltip> 
                                : 
                                <Button size="small" color="primary" onClick={(e) => { e.preventDefault(); handleOpen(e)}}>
                                    Alquilar
                                </Button>
                            }
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={open}
                                onClose={handleClose}
                            >
                                <div style={modalStyle} className={classes.paper}>
                                    <BBQRent id={item.id} handlerClose={handleClose} fetch={fetchMyAPI} {...props}/>
                                </div>
                            </Modal>
                            <Button type="button" size="small" color="primary" onClick={() => { handleDelete(item) }}>
                                Eliminar
                            </Button>
                        </CardActions>
                </Card>
            )}
        </div>
        
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MyBBQPage);