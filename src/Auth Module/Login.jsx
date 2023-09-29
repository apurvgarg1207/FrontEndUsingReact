// import React, { Component } from 'react';
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { green, purple, pink, yellow } from "./Color";
// import { FaUserAlt } from 'react-icons/fa';
// import swal from 'sweetalert';
// import { useNavigate } from 'react-router-dom';




// const theme = createTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//       dark: purple[900],
//       light: purple[200]
//     },
//     primaryLight: {
//       main: purple[200],
//       dark: purple[300],
//       light: purple[100]
//     },
//     secondary: {
//       main: "#000000"
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
//       // color: 'primary.dark'
//     },
//   },
// });

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',
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
//     if (!this.state.email) {
//       validationErrors.email = 'Email is required';
//     }
//     if (!this.state.password) {
//       validationErrors.password = 'Password is required';
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       this.setState({ validationErrors });
//       return; // Prevent form submission if there are validation errors
//     }

//     // Prepare data for POST request
//     const postData = {
//       email: this.state.email,
//       password: this.state.password,
//     };

//     // Make the POST request (assuming 'fetch' is properly implemented elsewhere)
//     fetch('http://192.168.10.228:8099/api/user/loginUser', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.message === 'Login Successfully') {
//           // console.log(data);
//           swal('Success', data.message, 'success', {
//             buttons: true,
//             timer: 7000,
//           }).then((value) => {
//             localStorage.setItem('user', JSON.stringify(data.user));
//             window.location.href = '/';
//           });
//         } else {
//           swal('Failed Try Again', data.message, 'error', {
//             buttons: true,
//             timer: 7000,
//           }).then((value) => {
//             localStorage.setItem('user', JSON.stringify(data.user));
//             window.location.href = '/';
//           });
//         }
//       });
//   };



//   render() {

//     return (
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="sm">

//           <Box
//             border={5}
//             borderRadius='8px'
//             borderColor="primary.dark"
//             bgcolor="primary.main"
//             sx={{
//               boxShadow: 20,

//               px: 4,
//               py: 6,
//               marginTop: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",

//             }}>
//             <FaUserAlt size="100" style={{ color: "text" }} />
//             {/* <img src={logo} width={100} height={100} /> */}
//             <Box
//               border={5}
//               borderRadius='8px'
//               borderColor="primary.dark"
//               sx={{
//                 boxShadow: 10,
//                 borderRadius: 10,
//                 bgcolor: `primaryLight.light`,
//                 px: 4,
//                 py: 6,
//                 marginTop: 4,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 // borderRadius: 2,
//                 // bgcolor: "#	",

//               }}

//             >
//               {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
//               <Typography variant="h1" color="secondary" text-align="left">
//                 Sign in
//               </Typography>
//               <form onSubmit={this.handleSubmit} noValidate sx={{ mt: 3 }}>
//                 <TextField
//                   placeholder="Enter your valid email"
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email"
//                   name="email"
//                   autoComplete="email"
//                   value={this.state.email}
//                   onChange={this.handleChange}
//                 />
//                 {this.state.validationErrors.email && (
//                   <div className='text-danger'
//                   style={{color: 'red'}}>{this.state.validationErrors.email}</div>
//                 )}
//                 <TextField
//                   placeholder="Enter your Password"
//                   margin="normal"
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   // type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   // color="primary.dark"
//                   value={this.state.password}
//                   onChange={this.handleChange}
//                 />
//                 {this.state.validationErrors.password && (
//                   <div className='text-danger'
//                   style={{color: 'red'}}>{this.state.validationErrors.password}</div>
//                 )}
//                 <FormControlLabel
//                   control={<Checkbox value="remember" />}
//                   label="Remember me"
//                   bgcolor="primary.main"
//                 />
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{
//                     mt: 3,
//                     mb: 2,
//                   }}
//                 >
//                   Sign In
//                 </Button>
//                 <Grid container>
//                   <Grid item xs align="left">
//                     <a href= 'ForgotPwd' variant="body2">
//                       Forgot password?
//                     </a>
//                   </Grid>
//                   <Grid item>
//                     <a href="/signup" variant="body2">
//                       Don't have an account? Sign Up
//                     </a>

//                   </Grid>
//                 </Grid>
//               </form>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider >
//     );
//   }
// }
// export default Login;
import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from "./Color";
import { FaUserAlt } from 'react-icons/fa';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
            dark: purple[900],
            light: purple[200]
        },
        primaryLight: {
            main: purple[200],
            dark: purple[300],
            light: purple[100]
        },
        secondary: {
            main: "#000000"
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

function Login() {

    const navigate = useNavigate();
   
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const history = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setValidationErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newValidationErrors = {};
        if (!formData.email) {
            newValidationErrors.email = 'Email is required';
        }
        if (!formData.password) {
            newValidationErrors.password = 'Password is required';
        }

        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
            return;
        }

        const postData = {
            email: formData.email,
            password: formData.password,
        };

        fetch('http://192.168.10.163:10000/api/user/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.message === 'Login Successfully') {
                    swal('Success', data.message, 'success', {
                        buttons: true,
                        timer: 7000,
                    }).then((value) => {
                        localStorage.setItem('user', JSON.stringify(data.user));
                        history('/app/');
                    });
                } else {
                    swal('Failed Try Again', data.message, 'error', {
                        buttons: true,
                        timer: 7000,
                    }).then((value) => {
                        localStorage.setItem('user', JSON.stringify(data.user));
                        history('/');
                    });
                }
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <Box
                    border={5}
                    borderRadius='8px'
                    borderColor="primary.dark"
                    bgcolor="primary.main"
                    sx={{
                        boxShadow: 20,
                        px: 4,
                        py: 6,
                        marginTop: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <FaUserAlt size="100" style={{ color: "text" }} />
                    <Box
                        border={5}
                        borderRadius='8px'
                        borderColor="primary.dark"
                        sx={{
                            boxShadow: 10,
                            borderRadius: 10,
                            bgcolor: `primaryLight.light`,
                            px: 4,
                            py: 6,
                            marginTop: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h1" color="secondary" text-align="left">
                            Sign in
                        </Typography>
                        <form onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                            <TextField
                                placeholder="Enter your valid email"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {validationErrors.email && (
                                <div className='text-danger' style={{ color: 'red' }}>{validationErrors.email}</div>
                            )}
                            <TextField
                                placeholder="Enter your Password"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {validationErrors.password && (
                                <div className='text-danger' style={{ color: 'red' }}>{validationErrors.password}</div>
                            )}
                            <FormControlLabel
                                control={<Checkbox value="remember" />}
                                label="Remember me"
                                bgcolor="primary.main"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs align="left">
                                    <a href='ForgotPwd' variant="body2">
                                        Forgot password?
                                    </a>
                                </Grid>
                                <Grid item>
                                    <a href="" variant="body2" onClick={() => navigate('/signup')}>
                                        Don't have an account? Sign Up
                                    </a>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;
