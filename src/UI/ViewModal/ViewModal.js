import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Wrapper from "../../Helpers/Wrapper";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  errorTitle: {
      color: '#546e7a'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ViewModal(props) {

  const classes = useStyles();
  return (
    <Wrapper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 className={classes.errorTitle} id="transition-modal-title">{props.title}</h2>
            <div className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="firstName">Name</InputLabel>
                <Input id="firstName" value={props.userData.firstName?props.userData.firstName:'NA'} />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" value={props.userData.email?props.userData.email:'NA'} />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="isRegistration">Registered?</InputLabel>
                <Input id="isRegistration" value={props.userData.isRegistration} />
              </FormControl>
              { props.userData.isRegistration==='Yes' && 
                <div className={classes.root}>
                  <FormControl>
                    <InputLabel htmlFor="ethnicityMaster">Ethnicity Master</InputLabel>
                    <Input id="ethnicityMaster" value={props.userData.profile.ethnicityMaster} />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="ethnicityChild">Ethnicity Child</InputLabel>
                    <Input id="ethnicityChild" value={props.userData.profile.ethnicityChild} />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="gender">gender</InputLabel>
                    <Input id="gender" value={props.userData.profile.gender} />
                  </FormControl>
                </div>
              }
            </div><br/>
           
            <Button variant="outlined" size="small" color="primary" onClick={props.handleClose}>Close</Button>
          </div>
        </Fade>
      </Modal>
    </Wrapper>
  );
}
