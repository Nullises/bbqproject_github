import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withAuthorization } from '../Session';
import SignOutLink from '../SignOutLink';
import linksDashboard from './linksDashboard';
import DashboardStyle from '../../styles/Dashboard'
import MapIndex from '../Map';

const condition = authUser => !!authUser;

function Dashboard(props) {

  const classes = DashboardStyle();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [setSelectedItem] = React.useState({
    title: 'Mapa',
    render: <MapIndex /> 
  });


  function handleListItemClick(event, index, item) {
    setSelectedIndex(index);
    setSelectedItem.title = item.display
    setSelectedItem.render = item.comp
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {setSelectedItem.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <ListItemText secondary="Mi Dashboard" primary={props.firebase.auth.currentUser.displayName} />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {linksDashboard.map((item, i) => 
             <ListItem button 
             key={i}
             selected={selectedIndex === i}
             onClick={event => handleListItemClick(event, i, item)}
              >
              <ListItemIcon>
                <SvgIcon>
                  <path d={item.svgCode} />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary={item.display} />
            </ListItem>
          )}
          <Divider />
          <SignOutLink />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {setSelectedItem.render}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default withAuthorization(condition)(Dashboard);