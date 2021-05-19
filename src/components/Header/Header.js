import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import dotenv from 'dotenv';
dotenv.config();

function Header(props){
    const classes = props.useStyles;
    const open = props.open;
    let history = useHistory();
    const handleDrawerOpen = () => {
        props.onCheckhandleDrawerOpen()
    };
    const logout = () => {
      localStorage.setItem('adminToken', '');
      // console.log('adminToken',localStorage.getItem('adminToken'))
      history.push("/");
    }

    return (
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} noWrap>
              BEAM
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
    )
}

export default Header;
