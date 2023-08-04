import { makeStyles } from '@material-ui/core/styles';



const ModalStyle = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
  }));


export default ModalStyle;