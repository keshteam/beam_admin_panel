import React from "react";
import ReactDom from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Wrapper from "../../Helpers/Wrapper";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  errorTitle: {
    color: "red",
  },
}));

const MainSection = (props) => {
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
            <h2 className={classes.errorTitle} id="transition-modal-title">
              {props.title}
            </h2>
            <p id="transition-modal-description">{props.message}</p>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={props.handleClose}
            >
              Okay
            </Button>
          </div>
        </Fade>
      </Modal>
    </Wrapper>
  );
};

function ErrorModal(props) {
  return ReactDom.createPortal(
    <MainSection
      open={props.open}
      title={props.title}
      message={props.message}
      handleClose={props.handleClose}
    />,
    document.getElementById("error")
  );
}

export default ErrorModal;
