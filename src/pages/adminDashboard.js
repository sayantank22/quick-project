// import React from 'react';
// import MaterialTable from 'material-table';
// import { forwardRef } from 'react';

// import AddBox from '@material-ui/icons/AddBox';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
// import Clear from '@material-ui/icons/Clear';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';
// import Edit from '@material-ui/icons/Edit';
// import FilterList from '@material-ui/icons/FilterList';
// import FirstPage from '@material-ui/icons/FirstPage';
// import LastPage from '@material-ui/icons/LastPage';
// import Remove from '@material-ui/icons/Remove';
// import SaveAlt from '@material-ui/icons/SaveAlt';
// import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';

// const tableIcons = {
//   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//   DetailPanel: forwardRef((props, ref) => (
//     <ChevronRight {...props} ref={ref} />
//   )),
//   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   PreviousPage: forwardRef((props, ref) => (
//     <ChevronLeft {...props} ref={ref} />
//   )),
//   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//   SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
// };

// export default function MaterialTableDemo() {
//   const [state, setState] = React.useState({
//     columns: [
//       { title: 'Name', field: 'name' },
//       { title: 'Surname', field: 'surname' },
//       { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
//       {
//         title: 'Birth Place',
//         field: 'birthCity',
//         lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//       },
//     ],
//     data: [
//       { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
//       {
//         name: 'Zerya Betül',
//         surname: 'Baran',
//         birthYear: 2017,
//         birthCity: 34,
//       },
//     ],
//   });

//   return (
//     <MaterialTable
//       icons={tableIcons}
//       title='Editable Example'
//       columns={state.columns}
//       data={state.data}
//       editable={{
//         onRowAdd: (newData) =>
//           new Promise((resolve) => {
//             setTimeout(() => {
//               resolve();
//               setState((prevState) => {
//                 const data = [...prevState.data];
//                 data.push(newData);
//                 return { ...prevState, data };
//               });
//             }, 600);
//           }),
//         onRowUpdate: (newData, oldData) =>
//           new Promise((resolve) => {
//             setTimeout(() => {
//               resolve();
//               if (oldData) {
//                 setState((prevState) => {
//                   const data = [...prevState.data];
//                   data[data.indexOf(oldData)] = newData;
//                   return { ...prevState, data };
//                 });
//               }
//             }, 600);
//           }),
//         onRowDelete: (oldData) =>
//           new Promise((resolve) => {
//             setTimeout(() => {
//               resolve();
//               setState((prevState) => {
//                 const data = [...prevState.data];
//                 data.splice(data.indexOf(oldData), 1);
//                 return { ...prevState, data };
//               });
//             }, 600);
//           }),
//       }}
//     />
//   );
// }

// material-ui-table-crud-restapi

import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
// import Grid from '@material-ui/core/Grid';
import generator from 'generate-password';
// import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// import cors from 'cors';
// import emailjs from 'emailjs-com';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

import { auth } from '../firebase/firebase.utils';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// const api = axios.create({
//   baseURL: `https://reqres.in/api`,
// });

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

function App() {
  const classes = useStyles();

  var columns = [
    { title: 'id', field: 'id', hidden: true },
    {
      title: 'Avatar',
      render: (rowData) => (
        <Avatar
          maxInitials={1}
          size={40}
          round={true}
          name={rowData === undefined ? ' ' : rowData.firstName}
        />
      ),
    },
    { title: 'User ID', field: 'userId' },
    { title: 'First name', field: 'firstName' },
    { title: 'Last name', field: 'lastName' },
    { title: 'email', field: 'email' },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    dotenv.config();
    // const gmailEmail = functions.config().gmail.email;
    // const gmailPassword = functions.config().gmail.password;

    // console.log(gmailPassword);
    axios
      .get(
        'https://us-central1-testproject-257115.cloudfunctions.net/api/users'
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    const newUserData = {
      firstName: newData.firstName,
      lastName: newData.lastName,
      email: newData.email,
    };

    //validation
    let errorList = [];
    if (newData.firstName === '') {
      errorList.push('Please enter first name');
    }
    if (newData.lastName === '') {
      errorList.push('Please enter last name');
    }
    if (newData.email === '' || validateEmail(newData.email) === false) {
      errorList.push('Please enter a valid email');
    }

    console.log(newData);
    console.log(oldData);

    if (errorList.length < 1) {
      axios
        .post(
          `https://us-central1-testproject-257115.cloudfunctions.net/api/user/${oldData.userId}`,
          newUserData
        )
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessages([error]);
          setIserror(true);
          resolve();
        });

      // api
      //   .patch('/users/' + newData.id, newData)
      //   .then((res) => {
      //     const dataUpdate = [...data];
      //     const index = oldData.tableData.id;
      //     dataUpdate[index] = newData;
      //     setData([...dataUpdate]);
      //     resolve();
      //     setIserror(false);
      //     setErrorMessages([]);
      //   })
      //   .catch((error) => {
      //     setErrorMessages(['Update failed! Server error']);
      //     setIserror(true);
      //     resolve();
      //   });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    const newUserData = {
      firstName: newData.firstName,
      lastName: newData.lastName,
      email: newData.email,
    };

    // console.log(newData);
    //validation
    let errorList = [];
    if (newData.firstName === undefined) {
      errorList.push('Please enter first name');
    }
    if (newData.lastName === undefined) {
      errorList.push('Please enter last name');
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push('Please enter a valid email');
    }

    if (errorList.length < 1) {
      //no error
      // console.log(newUserData);

      let password = generator.generate({
        length: 10,
        numbers: true,
      });
      console.log(password);

      auth
        .createUserWithEmailAndPassword(newData.email, password)
        .then((res) => {
          console.log(res);

          // to make it work you need gmail account
          // const gmailEmail = functions.config().gmail.login;
          // const gmailPassword = functions.config().gmail.pass;

          // console.log(gmailPassword);
        })
        .catch((err) => console.log(err.msg));

      axios
        .post(
          'https://us-central1-testproject-257115.cloudfunctions.net/api/user',
          newUserData
        )
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessages([error]);
          setIserror(true);
          resolve();
        });

      const userData = {
        recipient: 'sayantank22@gmail.com',
        sender: 'karmakarbarun22@gmail.com',
        topic: 'Test',
        text: 'Hey, it worked!',
      };

      axios
        .post(
          'http://localhost:4000/send-email',
          // 'https://tierone-test-project-backend.herokuapp.com/send',
          userData
        )
        .catch((err) => console.log(err));

      // axios({
      //   method: 'POST',
      //   url: 'http://localhost:4444/send',
      //   data: {
      //     name: 'Sayantan',
      //     email: 'Karmakar',
      //     messsage: 'User created successfully!!',
      //   },
      //   cors,
      // }).then((response) => {
      //   if (response.data.msg === 'success') {
      //     alert('Message Sent.');
      //   } else if (response.data.msg === 'fail') {
      //     alert('Message failed to send.');
      //   }
      // });

      // axios
      //   .post(
      //     // 'http://localhost:8080/send',
      //     'https://tierone-test-project-backend.herokuapp.com/send',
      //     cors(),
      //     {
      //       name: 'Sayantan',
      //       email: 'Karmakar',
      //       messsage: 'User created successfully!!',
      //     },
      //     cors()
      //   )
      //   .then((response) => {
      //     if (response.data.msg === 'success') {
      //       alert('Message Sent.');
      //     } else if (response.data.msg === 'fail') {
      //       alert('Message failed to send.');
      //     }
      //   })
      //   .catch((err) => console.log(err));

      // emailjs.sendForm('gmail', 'template_6PDtcFqn', e.target, 'user_07PqwM5kpCV327zagsR42')
      // .then((result) => {
      //     console.log(result.text);
      // }, (error) => {
      //     console.log(error.text);
      // });

      axios
        .get(
          'https://us-central1-testproject-257115.cloudfunctions.net/api/users'
        )
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // api
      //   .post('/users', newData)
      //   .then((res) => {
      //     let dataToAdd = [...data];
      //     dataToAdd.push(newData);
      //     setData(dataToAdd);
      //     resolve();
      //     setErrorMessages([]);
      //     setIserror(false);
      //   })
      //   .catch((error) => {
      //     setErrorMessages(['Cannot add data. Server error!']);
      //     setIserror(true);
      //     resolve();
      //   });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(
        `https://us-central1-testproject-257115.cloudfunctions.net/api/user/${oldData.userId}`
      )
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessages([error]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div className='App'>
      {/* <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}> */}
      <div>
        {iserror && (
          <Alert severity='error'>
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>;
            })}
          </Alert>
        )}
      </div>
      <MaterialTable
        title='User data from remote source'
        columns={columns}
        data={data}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
      />
      <br />

      {/* </Grid>
         <Grid item xs={3}></Grid> 
      </Grid> */}
      <h2>Final list of users</h2>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>User Id</StyledTableCell>
              <StyledTableCell align='right'>First Name</StyledTableCell>
              <StyledTableCell align='right'>Last Name</StyledTableCell>
              <StyledTableCell align='right'>Email</StyledTableCell>
              <StyledTableCell align='right'>Download Image</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
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
                      <a
                        href={row.displayPicture}
                        target='_blank'
                        rel='noopener noreferrer'
                        download>
                        <button>
                          <i className='fas fa-download' />
                          Download Image
                        </button>
                      </a>
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

export default withRouter(App);
