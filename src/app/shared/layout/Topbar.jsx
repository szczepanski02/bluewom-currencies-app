import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import DrawerNav from '../components/DrawerNav';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const Topbar = () => {
    const classes = useStyles();
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleMenuClick = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={handleMenuClick} aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>Bluewom APP</Typography>
                </Toolbar>
            </AppBar>

            <DrawerNav open={isDrawerOpen} close={handleDrawerClose}/>
        </div>
    )
}

export default Topbar;