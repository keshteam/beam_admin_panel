import React, { 
    // useState 
  } from 'react';
  
  import clsx from 'clsx';
  import { makeStyles, useTheme } from '@material-ui/core/styles';
  import CssBaseline from '@material-ui/core/CssBaseline';
  import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
    useHistory
  } from "react-router-dom";
  
  import Dashboard from "../Dashboard/Dashboard";
  import User from "../User/User";
  import Feedback from "../Feedback/Feedback";
  import Header from "../Header/Header";
  import Sidebar from "../Sidebar/Sidebar";
  
  
  const drawerWidth = 240;
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    title: {
      flexGrow: 1,
    },
  }));
  
  function Main(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
  
    const checkhandleDrawerOpen = () => {
      setOpen(true);
    }
    const checkhandleDrawerClose = () => {
      setOpen(false);
    };
  
    if(!localStorage.getItem('adminToken')) {
      history.push("/");
    }
  
    return (
      <div className={classes.root}>
        
        <CssBaseline />
        <Header useStyles={classes} open={open} onCheckhandleDrawerOpen={checkhandleDrawerOpen}/>
        <Router>
          <Sidebar useStyles={classes} useTheme={theme} open={open} onCheckhandleDrawerClose={checkhandleDrawerClose} />
  
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Switch>
              <Route exact path={`${props.match.path}/dashboard`} component={Dashboard} />
              <Route path={`${props.match.path}/users`} component={User} />
              <Route path={`${props.match.path}/feedbacks`} component={Feedback} />
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
  
  export default Main;
  