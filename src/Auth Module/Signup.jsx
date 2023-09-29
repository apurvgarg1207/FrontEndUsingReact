// import React, { Component } from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import swal from 'sweetalert';
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import { FaUserLock } from 'react-icons/fa';
// // import { BrowserRouter as Link } from 'react-router-dom';
// import Link from "@mui/material/Link";
// // import PasswordInput from './PasswordInput';
// import { purple } from './Color';
// import { useNavigate } from 'react-router-dom';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//       dark: purple[900],
//       light: purple[200],
//     },
//     secondary: {
//       main: '#000000',
//     },
//   },
//   typography: {
//     h1: {
//       fontSize: 50,
//       fontWeight: 500,
//       fontFamily: 'Raleway',
//     },
//     body2: {
//       fontFamily: 'Raleway',
//     },
//   },
// });

// class Signup extends Component {
//   constructor() {
//     super();
//     this.state = {
//       fname: '',
//       lname: '',
//       email: '',
//       mobileno: '',
//       address1: '',
//       address2: '',
//       city: '',
//       pincode: '',
//       district: '',
//       state: '',
//       password: '',
//       // isPasswordValid: false,
//       validationErrors: {},
//     };
//   }
//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value, validationErrors: {} });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     // Frontend validation
//     const validationErrors = {};
//     if (!this.state.fname) {
//       validationErrors.fname = 'First Name is required';
//     }
//     if (!this.state.lname) {
//       validationErrors.lname = 'Last Name is required';
//     }
//     if (!this.state.email) {
//       validationErrors.email = 'Email is required';
//     }
//     if (!this.state.mobileno) {
//       validationErrors.mobileno = 'Phone Number is required';
//     }
//     if (this.state.mobileno.length !== 10) {
//       validationErrors.mobileno = 'Phone Number must be 10 digits';
//     }
//     if (!this.state.address1) {
//       validationErrors.address1 = 'Address is required';
//     }
//     if (!this.state.address2) {
//       validationErrors.address2 = 'Address is required';
//     }
//     if (!this.state.city) {
//       validationErrors.city = 'City is required';
//     }
//     if (!this.state.pincode) {
//       validationErrors.pincode = 'Pincode is required';
//     }
//     if (this.state.pincode.length !== 6) {
//       validationErrors.pincode = 'Pincode must be 6 digits';
//     }
//     if (!this.state.district) {
//       validationErrors.district = 'District is required';
//     }
//     if (!this.state.state) {
//       validationErrors.state = 'State is required';
//     }
//     if (!this.state.password) {
//       validationErrors.password = 'Password is required';

//     }

//     if (Object.keys(validationErrors).length > 0) {
//       this.setState({ validationErrors });
//       return;
//     }

//     // Prepare data for POST request
//     const postData = {
//       fname: this.state.fname,
//       lname: this.state.lname,
//       email: this.state.email,
//       mobileno: this.state.mobileno,
//       address1: this.state.address1,
//       address2: this.state.address2,
//       city: this.state.city,
//       pincode: this.state.pincode,
//       district: this.state.district,
//       state: this.state.state,
//       password: this.state.password,
//     };

//     // Make the POST request (assuming 'fetch' is properly implemented elsewhere)
//     fetch('http://192.168.10.163:10000/api/user/registerUser', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // console.log(data.success);
//         if (data.status === true) {
//           swal('Success', data.message, 'success', {
//             buttons: true,
//             timer: 7000,
//           }).then((value) => {
//             localStorage.setItem('user', JSON.stringify(data.user));
//             window.location.href = '/login';
//           });
//         } else {
//           swal('Failed', data.message, 'error', {
//             buttons: true,
//             timer: 7000,
//           }).then((value) => {
//             localStorage.setItem('user', JSON.stringify(data.user));
//             window.location.href = '/signup';
//           });
//         }
//       });
//   };

//   render() {
//     return (
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="md">
//           <CssBaseline />
//           <Box
//             border={5}
//             borderRadius='8px'
//             borderColor="primary.dark"
//             bgcolor="primary.main"
//             sx={{
//               boxShadow: 20,
//               borderRadius: 9,
//               px: 4,
//               py: 6,
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <FaUserLock size="100" style={{ color: "black" }} />
//             <Box
//               border={5}
//               borderRadius='8px'
//               borderColor="primary.dark"
//               sx={{
//                 boxShadow: 3,
//                 borderRadius: 9,
//                 px: 4,
//                 py: 5,
//                 marginTop: 4,
//                 backgroundColor: "white",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Typography component="h1" variant="poster" color="text">
//                 Sign Up
//               </Typography>
//               <form onSubmit={this.handleSubmit} noValidate sx={{ mt: 3 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       placeholder="Enter your first name"
//                       // autoComplete="given-name"
//                       name="fname"
//                       required
//                       fullWidth
//                       id="fname"
//                       label="First Name"
//                       autoFocus
//                       value={this.state.fname}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.fname && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}
//                       >{this.state.validationErrors.fname}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       placeholder="Enter your last name"
//                       required
//                       fullWidth
//                       id="lname"
//                       label="Last Name"
//                       name="lname"
//                       value={this.state.lname}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.lname && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}>{this.state.validationErrors.lname}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       placeholder="Enter your valid email"
//                       required
//                       fullWidth
//                       id="email"
//                       label="Email Address"
//                       name="email"
//                       autoComplete="email"
//                       value={this.state.email}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.email && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}>{this.state.validationErrors.email}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       id="outlined-error-helper-text"
//                       label="Mobile No"
//                       name="mobileno"
//                       autoComplete="mobileno"
//                       value={this.state.mobileno}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.mobileno && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}>{this.state.validationErrors.mobileno}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       autoComplete="given-address1"
//                       name="address1"
//                       required
//                       fullWidth
//                       id="address1"
//                       label="Address Line 1"
//                       autoFocus
//                       value={this.state.address1}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.address1 && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}>{this.state.validationErrors.address1}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       autoComplete="given-address2"
//                       name="address2"
//                       required
//                       fullWidth
//                       id="address2"
//                       label="Address Line 2"
//                       autoFocus
//                       value={this.state.address2}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.address2 && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}>{this.state.validationErrors.address2}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       placeholder="City"
//                       required
//                       fullWidth
//                       id="city"
//                       label="City"
//                       name="city"
//                       autoComplete="family-name"
//                       value={this.state.city}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.city && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}>{this.state.validationErrors.city}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       placeholder="Pincode"
//                       required
//                       fullWidth
//                       id="pincode"
//                       label="Pincode"
//                       name="pincode"
//                       autoComplete="family-name"
//                       value={this.state.pincode}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.pincode && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}>{this.state.validationErrors.pincode}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       placeholder="District"
//                       required
//                       fullWidth
//                       id="district"
//                       label="District"
//                       name="district"
//                       autoComplete="family-name"
//                       value={this.state.district}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.district && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}>{this.state.validationErrors.district}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       placeholder="State"
//                       required
//                       fullWidth
//                       id="state"
//                       label="State"
//                       name="state"
//                       autoComplete="family-name"
//                       value={this.state.state}
//                       onChange={this.handleChange}
//                     />
//                     {this.state.validationErrors.state && (
//                       <div className='text-danger'
//                         style={{ color: 'red' }}>{this.state.validationErrors.state}</div>
//                     )}
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       name="password"
//                       label="Password"
//                       type="password"
//                       id="password"
//                       autoComplete="new-password"
//                       value={this.state.password}
//                       onChange={this.handleChange}
//                     />
//                     {/* <PasswordInput
                    
//                       label="Password"
//                       name="password"
//                       value={this.state.password}
//                       onChange={(newPassword, isValid) => this.handlePasswordChange(newPassword, isValid)}
//                       // onChange={(newPassword, isValid) => this.handlePasswordChange(newPassword, isValid)}
//                     /> */}
//                     {this.state.validationErrors.password && (
//                       <div className='text-danger' style={{ color: 'red' }}>{this.state.validationErrors.password} </div>
//                     )}
                    
//                     {/* {this.state.validationErrors.password && ( */}
//                       {/* <div className='text-danger' */}
//                         {/* style={{ color: 'red' }}>{this.state.validationErrors.password}</div> */}
//                     {/* )} */}
//                   </Grid>
//                   <Grid container justifyContent="flex-end">
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       sx={{
//                         mt: 3,
//                         mb: 2,
//                       }}

//                     >
//                       Sign Up
//                     </Button>
//                   </Grid>
//                   <Grid container justifyContent="flex-end">
//                     <Grid item>
//                       <Link to="/Login" variant="body2">
//                         {" Already have an account? Sign in"}
//                       </Link>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </form>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     );
//   }
// }

// export default Signup;
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import swal from 'sweetalert';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FaUserLock } from 'react-icons/fa';
import { purple } from './Color';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
      dark: purple[900],
      light: purple[200],
    },
    secondary: {
      main: '#000000',
    },
  },
  typography: {
    h1: {
      fontSize: 50,
      fontWeight: 500,
      fontFamily: 'Raleway',
    },
    body2: {
      fontFamily: 'Raleway',
    },
  },
});

function Signup() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobileno: '',
    address1: '',
    address2: '',
    city: '',
    pincode: '',
    district: '',
    state: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation
    const newValidationErrors = {};
    if (!formData.fname) {
      newValidationErrors.fname = 'First Name is required';
    }
    if (!formData.lname) {
      newValidationErrors.lname = 'Last Name is required';
    }
    if (!formData.email) {
      newValidationErrors.email = 'Email is required';
    }
    if (!formData.mobileno) {
      newValidationErrors.mobileno = 'Phone Number is required';
    }
    if (formData.mobileno.length !== 10) {
      newValidationErrors.mobileno = 'Phone Number must be 10 digits';
    }
    if (!formData.address1) {
      newValidationErrors.address1 = 'Address is required';
    }
    if (!formData.address2) {
      newValidationErrors.address2 = 'Address is required';
    }
    if (!formData.city) {
      newValidationErrors.city = 'City is required';
    }
    if (!formData.pincode) {
      newValidationErrors.pincode = 'Pincode is required';
    }
    if (formData.pincode.length !== 6) {
      newValidationErrors.pincode = 'Pincode must be 6 digits';
    }
    if (!formData.district) {
      newValidationErrors.district = 'District is required';
    }
    if (!formData.state) {
      newValidationErrors.state = 'State is required';
    }
    if (!formData.password) {
      newValidationErrors.password = 'Password is required';
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      return;
    }

    // Prepare data for POST request
    const postData = {
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      mobileno: formData.mobileno,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      pincode: formData.pincode,
      district: formData.district,
      state: formData.state,
      password: formData.password,
    };

    // Make the POST request (assuming 'fetch' is properly implemented elsewhere)
    fetch('http://192.168.10.163:10000/api/user/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          swal('Success', data.message, 'success', {
            buttons: true,
            timer: 7000,
          }).then((value) => {
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/login');
          });
        } else {
          swal('Failed', data.message, 'error', {
            buttons: true,
            timer: 7000,
          }).then((value) => {
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/signup');
          });
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          border={5}
          borderRadius='8px'
          borderColor="primary.dark"
          bgcolor="primary.main"
          sx={{
            boxShadow: 20,
            borderRadius: 9,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FaUserLock size="100" style={{ color: "black" }} />
          <Box
            border={5}
            borderRadius='8px'
            borderColor="primary.dark"
            sx={{
              boxShadow: 3,
              borderRadius: 9,
              px: 4,
              py: 5,
              marginTop: 4,
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="poster" color="text">
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Enter your first name"
                    name="fname"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    autoFocus
                    value={formData.fname}
                    onChange={handleChange}
                  />
                  {validationErrors.fname && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.fname}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Enter your last name"
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                  />
                  {validationErrors.lname && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.lname}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Enter your valid email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {validationErrors.email && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.email}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Mobile No"
                    name="mobileno"
                    autoComplete="mobileno"
                    value={formData.mobileno}
                    onChange={handleChange}
                  />
                  {validationErrors.mobileno && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.mobileno}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-address1"
                    name="address1"
                    required
                    fullWidth
                    id="address1"
                    label="Address Line 1"
                    autoFocus
                    value={formData.address1}
                    onChange={handleChange}
                  />
                  {validationErrors.address1 && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.address1}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-address2"
                    name="address2"
                    required
                    fullWidth
                    id="address2"
                    label="Address Line 2"
                    autoFocus
                    value={formData.address2}
                    onChange={handleChange}
                  />
                  {validationErrors.address2 && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.address2}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="City"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="family-name"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {validationErrors.city && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.city}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Pincode"
                    required
                    fullWidth
                    id="pincode"
                    label="Pincode"
                    name="pincode"
                    autoComplete="family-name"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {validationErrors.pincode && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.pincode}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="District"
                    required
                    fullWidth
                    id="district"
                    label="District"
                    name="district"
                    autoComplete="family-name"
                    value={formData.district}
                    onChange={handleChange}
                  />
                  {validationErrors.district && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.district}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="State"
                    required
                    fullWidth
                    id="state"
                    label="State"
                    name="state"
                    autoComplete="family-name"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  {validationErrors.state && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.state}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {validationErrors.password && (
                    <div className='text-danger' style={{ color: 'red' }}>{validationErrors.password}</div>
                  )}
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                    }}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <a href="/" variant="body2" onClick={() => navigate('/')}>
                      {"Already have an account? Sign in"}
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
