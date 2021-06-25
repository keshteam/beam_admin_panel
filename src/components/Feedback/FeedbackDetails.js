import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'feedbackMsg', label: 'Message', minWidth: 170 },
  { id: 'isSmiled', label: 'Reaction', minWidth: 100 },
  {
    id: 'level',
    label: 'Level',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'updatedOn',
    label: 'Updated',
    minWidth: 170,
    align: 'center',
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const FeedbackDetails = (props) => {
  const classes = useStyles();
  const [feedbacksData, setFeedbacksData] = useState([]);

  useEffect(() => {
    props.userFeedback.map((element)=>{
      element.isSmiled = (element.isSmiled === '')? element.isSmiled : (element.isSmiled === 'happy')? '😃':'😔';
      element.level = element.level.split('_')[1];
      return element;
    })
    setFeedbacksData(props.userFeedback)
  }, [props.userFeedback]);

  return (
    <Paper className={classes.root}>
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
            {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { */}
            {feedbacksData.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
};

export default FeedbackDetails;
