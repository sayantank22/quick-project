import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function CustomizedTables() {
  const classes = useStyles();

  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    // console.log('ComponentDidMount');
    axios
      .get(
        `https://us-central1-testproject-257115.cloudfunctions.net/api/users`
      )
      .then((res) => {
        console.log(res.data);
        setUserData([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>User who have uploaded their photo</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>User Id</StyledTableCell>
              <StyledTableCell align='right'>First Name</StyledTableCell>
              <StyledTableCell align='right'>Last Name</StyledTableCell>
              <StyledTableCell align='right'>Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component='th' scope='row'>
                  <Link to={`/user/${row.userId}`}>{row.userId}</Link>
                </StyledTableCell>
                <StyledTableCell align='right'>{row.firstName}</StyledTableCell>
                <StyledTableCell align='right'>{row.lastName}</StyledTableCell>
                <StyledTableCell align='right'>{row.email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <h2>Final list of users</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>User Id</StyledTableCell>
              <StyledTableCell align='right'>First Name</StyledTableCell>
              <StyledTableCell align='right'>Last Name</StyledTableCell>
              <StyledTableCell align='right'>Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map(
              (row, index) =>
                row.isEdited && (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row'>
                      <Link to={`/user/${row.userId}`}>{row.userId}</Link>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {row.firstName}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {row.lastName}
                    </StyledTableCell>
                    <StyledTableCell align='right'>{row.email}</StyledTableCell>
                    <StyledTableCell align='right'>
                      <button>download</button>
                    </StyledTableCell>
                  </StyledTableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CustomizedTables;
