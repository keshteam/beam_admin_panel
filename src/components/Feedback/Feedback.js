import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config();
import VisibilityIcon from "@material-ui/icons/Visibility";
import ViewModal from "../../UI/ViewModal/ViewModal"

const columns = [
  { id: "firstName", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "isRegistration", label: "Registered?", minWidth: 100 },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString('en-US'),
  },
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function Feedback() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = useState([]);
  const [userFeedback, setUserFeedback] = useState();
  const [openViewModal, setViewOpenModal] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewFeedbackHandler = async(feedbackData) =>{
    // console.log("feedbackData", feedbackData);
    setUserFeedback(feedbackData)
    setViewOpenModal(true)
  };

  useEffect(() => {
    const getFeedbackList = async () => {
      try {
        let {data} = await axios.get(
          process.env.REACT_APP_API_URL + "feedback/getAll"
        );
        let usersList = data.map((element) => {
            let user = {};
            user.firstName = element.user.firstName;
            user.email = element.user.email;
            user.isRegistration = element.user.isRegistration ? "Yes" : "No";
            user.action = (
            <React.Fragment>
              <VisibilityIcon color="primary" onClick={()=>{ viewFeedbackHandler(element.feedbackData) }} />
            </React.Fragment>
          );
          return user;
        });
        // console.log(feedbackList)
        setUsers(usersList);
      } catch (e) {
        console.log("error in getUserList", e);
      }
    };
    // call feedback data on page loading
    getFeedbackList();
  }, []);

  const closeViewModalHandler = ()=> {
    setUserFeedback(null)
    setViewOpenModal(false);
  }

  return (
    <>
    {userFeedback && <ViewModal handleClose={closeViewModalHandler} open={openViewModal} title={'View Feedback'} userFeedback={userFeedback}/>}
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
