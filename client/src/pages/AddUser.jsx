// import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";

// const theme = createTheme();

// function Signup() {
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const email = data.get("email");
//     const password = data.get("password");
//     console.log({
//       email,
//       password,
//     });
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     if (!ValidateEmail(email)) {
//       setError("You have entered an invalid email address!");
//       return;
//     }
//     const url = "http://localhost:3000/signup";
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//       credentials: "include",
//     };

//     fetch(url, requestOptions)
//       .then((response) => {
//         console.log(response);
//         if (!response.ok) {
//           if (response.status === 401) {
//             console.log("hi");
//           }
//           return response.json().then((data) => {
//             throw new Error(data.message);
//           });
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // setUser(user);
//         setError("Registration successful");
//         navigate("/fullRegistration", { state: { email, password } });
//       })
//       .catch((error) => {
//         setError(error.message);
//       });

//     // Clear error message if form is valid
//     setError("");
//   };

//   function ValidateEmail(mailAddress) {
//     let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (mailAddress.match(mailformat)) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Grid
//           container
//           spacing={0}
//           direction="column"
//           alignItems="center"
//           justifyContent="center"
//           style={{ minHeight: "100vh" }}
//         >
//           <Box
//             sx={{
//               marginTop: theme.spacing(8),
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign up
//             </Typography>
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               noValidate
//               sx={{ mt: 3 }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="new-password"
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign Up
//               </Button>
//               <Grid container justifyContent="flex-end">
//                 <Grid item>
//                   <Link
//                     href="/login"
//                     variant="body2"
//                     sx={{ display: "flex", justifyContent: "center" }}
//                   >
//                     {"Already have an account? Sign in"}
//                   </Link>
//                 </Grid>
//               </Grid>
//               {error && (
//                 <Typography variant="body2" color="error" sx={{ mt: 1 }}>
//                   {error}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default Signup;
import React, { useState } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import VolunteerForm from "../components/VolunteerForm";
import PatientForm from "../components/PatientForm";
import AdminForm from "../components/AdminForm";
import { useLocation } from "react-router-dom";

const Signup = () => {
  const location = useLocation();
  const { email, password } = location.state || {};
  const [selectedForm, setSelectedForm] = useState("volunteer");

  const renderForm = () => {
    switch (selectedForm) {
      case "volunteer":
        return <VolunteerForm isApproved={true}/>;
      case "patient":
        return <PatientForm isApproved={true}/>;
      case "admin":
        return <AdminForm />;
      default:
        return null;
    }
  };

  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Choose Request Type
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <Button
          onClick={() => setSelectedForm("volunteer")}
          variant="contained"
          sx={{ marginRight: 2 }}
        >
          Volunteer Request
        </Button>
        <Button onClick={() => setSelectedForm("patient")} variant="contained" sx={{ marginRight: 2 }}>
          Assistance Request
        </Button>
        <Button onClick={() => setSelectedForm("admin")} variant="contained">
          new admin
        </Button>
      </Box>
      <Box>{renderForm()}</Box>
    </Container>
  );
};

export default Signup;
