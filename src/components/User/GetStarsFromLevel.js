import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Wrapper from "../../Helpers/Wrapper";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "level", label: "Name", minWidth: 170 },
  { id: "finalRoundStar", label: "Star", minWidth: 100 },
];

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
    color: "#546e7a",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  rootTable: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
}));

function StarListTable(props) {
  const classes = useStyles();
  const rows = props.starList;

  return (
    <Paper className={classes.rootTable}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default function GetStartModal(props) {
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
            <div className={classes.root}>
              {props.starData.length > 0 ? (
                <StarListTable starList={props.starData} />
              ) : (
                <p>No data found</p>
              )}
            </div>
            <br />

            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={props.handleClose}
            >
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
    </Wrapper>
  );
}
