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
import Grid from "@material-ui/core/Grid";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import axios from "axios";
import BulkPostcodeUpload from "./BulkPostcodeUpload";
import AddPostcode from "./AddPostcode";
import GetPostcodesByLocation from "./SearchByLocation";
import SearchByPostcode from "./SearchByPostcode";

const columns = [
  { id: "postcode", label: "Postcode", minWidth: 170 },
  { id: "location", label: "Location", minWidth: 170 },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  grid: {
    flexGrow: 1,
  },
}));

export default function Postcode() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [postcodes, setPostcodes] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deletePostcodeHandler = async (postcodeId) => {
    if (window.confirm("Are you sure want to delete?")) {
      try {
        let { data } = await axios.delete(
          `${process.env.REACT_APP_API_URL}postcode/delete/${postcodeId}`
        );

        setPostcodes((prevPostcodes) => {
          let prevdata = [...prevPostcodes];
          var index = prevdata.findIndex((data) => data.id === postcodeId);
          console.log(index);
          if (index !== -1) {
            prevdata.splice(index, 1);
            return prevdata;
          }
        });

        alert(data);
      } catch (error) {
        console.log("error in deletePostcodeHandler", error);
      }
    }
  };

  useEffect(() => {
    const getPostcodesList = async () => {
      try {
        let { data } = await axios.get(
          process.env.REACT_APP_API_URL + "postcode/getAll"
        );
        data.map((element) => {
          return (element.action = (
            <React.Fragment>
              <DeleteOutlined
                color="secondary"
                onClick={() => {
                  deletePostcodeHandler(element.id);
                }}
              />
            </React.Fragment>
          ));
        });
        setPostcodes(data);
      } catch (e) {
        console.log("error in getUserList", e);
      }
    };
    getPostcodesList();

    return () => {
      console.log("clean up");
    };
  }, [setPostcodes]);

  const getPostcodesByLocationHandler = (data) => {
    data.map((element) => {
      return (element.action = (
        <React.Fragment>
          <DeleteOutlined
            color="secondary"
            onClick={() => {
              deletePostcodeHandler(element.id);
            }}
          />
        </React.Fragment>
      ));
    });
    setPostcodes(data);
  };

  const getList = async() =>{
    try {
      let { data } = await axios.get(
        process.env.REACT_APP_API_URL + "postcode/getAll"
      );
      data.map((element) => {
        return (element.action = (
          <React.Fragment>
            <DeleteOutlined
              color="secondary"
              onClick={() => {
                deletePostcodeHandler(element.id);
              }}
            />
          </React.Fragment>
        ));
      });
      setPostcodes(data);
    } catch (e) {
      console.log("error in bulkDeleteHandler", e);
    }
  }

  const bulkDeleteHandler = async() => {
    getList();
  };

  const bulkUploadHandler = async() => {
    getList();
  }

  const addUserHandler = (data) => {
    data.action = (
      <React.Fragment>
        <DeleteOutlined
          color="secondary"
          onClick={() => {
            deletePostcodeHandler(data.id);
          }}
        />
      </React.Fragment>
    );
    setPostcodes((prevPostcodes) => {
      return [...prevPostcodes, data];
    });
  };

  const searchHandler = (data)=>{
    data.action = (
      <React.Fragment>
        <DeleteOutlined
          color="secondary"
          onClick={() => {
            deletePostcodeHandler(data.id);
          }}
        />
      </React.Fragment>
    );
    setPostcodes([data])
  }

  return (
    <>
      <div className={classes.grid}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <BulkPostcodeUpload onBulkUploadHandler={bulkUploadHandler} />
          </Grid>
          <Grid item xs={6}>
            <AddPostcode onAddUser={addUserHandler} />
          </Grid>
          <Grid item xs={6}>
            <GetPostcodesByLocation
              filteredData={getPostcodesByLocationHandler}
              onBulkDelete={bulkDeleteHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <SearchByPostcode onSearch={searchHandler}/>
          </Grid>
        </Grid>
      </div>
      <br />
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
              {postcodes
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
          count={postcodes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
