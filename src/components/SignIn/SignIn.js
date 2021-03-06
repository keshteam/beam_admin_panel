import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import axios from "axios";
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
dotenv.config();


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        BEAM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  let history = useHistory();
  const [checked, setChecked] = useState(false);
  const [enteredUserName, setEnteredUserName] = useState(Cookies.get('beamUserName'));
  const [enteredPassword, setEnteredPassword] = useState(Cookies.get('beamPassword'));
  const [isError, setIsError] = useState();
  const [openModal, setOpenModal] = useState(false);

  // console.log(localStorage.getItem('adminToken'))

  if(localStorage.getItem('adminToken')) {
    history.push("/admin/dashboard");
  }
  const userNameHandler = (event)=>{
    setChecked(false);
    setEnteredUserName(event.target.value)
  }

  const passwordHandler = (event)=>{
    setChecked(false);
    setEnteredPassword(event.target.value)
  }

  const closeErrorHandler = ()=> {
    setOpenModal(false);
    setIsError(null)
  }

  const rememberMeHandler = (event) => {
    event.preventDefault();
    if(enteredUserName.trim().length === 0){
      setOpenModal(true);
      setIsError({
        title: "Username Required",
        message: "Please enter valid username"
      })
      return;
    }
    if(enteredPassword.trim().length === 0){
      setOpenModal(true);
      setIsError({
        title: "Password Required",
        message: "Please enter valid password"
      })
      return;
    }

    setChecked(event.target.checked);
    if(event.target.checked){
      Cookies.set('beamUserName', enteredUserName);
      Cookies.set('beamPassword', enteredPassword);
      Cookies.set('beamRememberMeStatus', true);
    }else{
      Cookies.set('beamUserName', '');
      Cookies.set('beamPassword', '');
      Cookies.set('beamRememberMeStatus', false);
    }
  }

  useEffect(()=>{
    // console.log(typeof(Cookies.get('beamRememberMeStatus')))
    if(Cookies.get('beamRememberMeStatus') === 'true'){
      setChecked(true);
    }
  }, [])

  const handleSubmit = async(event)=>{
    event.preventDefault();
    if(enteredUserName.trim().length === 0){
      setOpenModal(true);
      setIsError({
        title: "Username Required",
        message: "Please enter valid username"
      })
      return;
    }
    if(enteredPassword.trim().length === 0){
      setOpenModal(true);
      setIsError({
        title: "Password Required",
        message: "Please enter valid password"
      })
      return;
    }
    try {
      const payload = {
        username: enteredUserName,
        password: enteredPassword
      }
      const admin = await axios.post(process.env.REACT_APP_API_URL+'admin/login', payload);
      localStorage.setItem('adminToken', admin.data.id)
      props.onSetToken();
      history.push("/admin/dashboard");
    } catch (error) {
      // (error.response.data.statusCode === 400)? alert(error.response.data.description) : alert(error.response)
      if(error.response.data.statusCode === 400){
        setOpenModal(true);
        setIsError({
          title: error.response.data.title,
          message: error.response.data.description
        });
      }else{
        alert(error.response)
      }
    }
  }

  return (
    <React.Fragment>
      {isError && <ErrorModal handleClose={closeErrorHandler} open={openModal} title={isError.title} message={isError.message}/>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={userNameHandler}
              value={enteredUserName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordHandler}
              value={enteredPassword}
            />
            <FormControlLabel
              control={<Checkbox onChange={rememberMeHandler.bind(this)} checked={checked} value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}