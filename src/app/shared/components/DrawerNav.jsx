import React, { useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { UsersContext } from '../../context/UsersContext';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {display: 'flex'},
  appBarShift: {width: `calc(100% - ${drawerWidth}px)`, marginLeft: drawerWidth},
  menuButton: {marginRight: theme.spacing(2),},
  hide: {display: 'none'},
  drawer: {width: drawerWidth, flexShrink: 0},
  drawerPaper: {width: drawerWidth},
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {flexGrow: 1, padding: theme.spacing(3), marginLeft: -drawerWidth},
}));

const DrawerNav = ({ open, close }) => {
    const classes = useStyles();
    const theme = useTheme();

    const { toggleLoggedState } = useContext(UsersContext);

    const logout = () => {
        toggleLoggedState(false);
    }

    const navItems = [
        {
            name: "Home",
            directTo: "/homePage",
            icon: <HomeIcon />
        },
        {
            name: "Your Currencies List",
            directTo: "/userCurrenciesList",
            icon: <FavoriteIcon />
        }
    ]

    const webToolsItems = [
        {
            name: "Logout",
            action: logout,
            icon: <ExitToAppIcon />
        }
    ]


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{paper: classes.drawerPaper}}>

        <div className={classes.drawerHeader}>
          <IconButton onClick={close}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

        <Divider />

            <List>
                {navItems.map((item, index) => (
                    <Link to={item.directTo} key={index}>
                        <ListItem button>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>

            <Divider />

            <List>
                {webToolsItems.map((item, index) => (
                    <ListItem button onClick={item.action} key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>

      </Drawer>

    </div>
  );
}
export default DrawerNav;