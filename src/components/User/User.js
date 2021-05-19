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
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
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
  // {
  //   id: 'size',
  //   label: 'Size\u00a0(km\u00b2)',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
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

export default function User() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = useState([]);
  const [isUserDetails, setIsUserDetails] = useState();
  const [openViewModal, setViewOpenModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewUserHandler = async(userId) =>{
    try {
      let {data} = await axios.get(
        `${process.env.REACT_APP_API_URL}user/get/${userId}`
      );
      data.isRegistration = data.isRegistration ? "Yes" : "No";
      setIsUserDetails(data)
      setViewOpenModal(true)
    } catch (e) {
      console.log("error in view user", e);
    }
  };

  const deleteUserHandler = async(userId) =>{
    if (window.confirm("Are you sure want to delete?")) {
      try{
        await axios.delete(
          `${process.env.REACT_APP_API_URL}user/delete/${userId}`
        );
        setDeleteUserId(userId)
      }catch(e){
        console.log("error in delete user", e);
      }
    }
  }

  useEffect(() => {
    const getUserList = async () => {
      try {
        let usersList = await axios.get(
          process.env.REACT_APP_API_URL + "user/getAll"
        );
        usersList = usersList.data.map((element) => {
          let data = {};
          data.id = element.id;
          data.firstName = element.firstName;
          data.email = element.email;
          data.isRegistration = element.isRegistration ? "Yes" : "No";
          data.profile = element.profile;
          data.action = (
            <React.Fragment>
              <VisibilityIcon color="primary" onClick={()=>{ viewUserHandler(element.id) }} />
              <DeleteOutlined color="secondary" onClick={()=>{ deleteUserHandler(element.id) }}/>
            </React.Fragment>
          );
          return data;
        });
        setUsers(usersList);
      } catch (e) {
        console.log("error in getUserList", e);
      }
    };
    // call user data on page loading
    getUserList();
  }, [deleteUserId]);

  const closeViewModalHandler = ()=> {
    setIsUserDetails(null)
    setViewOpenModal(false);
  }

  return (
    <>
    {isUserDetails && <ViewModal handleClose={closeViewModalHandler} open={openViewModal} title={'View User Details'} userData={isUserDetails}/>}
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
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
