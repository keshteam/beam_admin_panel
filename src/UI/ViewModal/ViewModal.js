import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Wrapper from "../../Helpers/Wrapper";
import SingleUserDetails from "../../components/User/SingleUserDetails"
import FeedbackDetails from "../../components/Feedback/FeedbackDetails"

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
              {props.userData && <SingleUserDetails userData={props.userData}/>}
              {props.userFeedback && <FeedbackDetails userFeedback={props.userFeedback}/>}
              
            </div><br/>
           
            <Button variant="outlined" size="small" color="primary" onClick={props.handleClose}>Close</Button>
          </div>
        </Fade>
      </Modal>
    </Wrapper>
  );
}
