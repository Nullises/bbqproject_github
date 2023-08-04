import { makeStyles } from '@material-ui/core/styles';
const myBBQStyle = makeStyles(theme => ({
  card: {
    maxWidth: 700,
    marginBottom: 10,
  },
  media: {
    height: 250,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  }));

export default myBBQStyle;