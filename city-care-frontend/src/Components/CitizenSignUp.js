import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { SignUpSchema } from "../Schemas";
import Alert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <NavLink color="inherit" to={"/"}>
        City Care
      </NavLink>
      {new Date().getFullYear()}
       
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function CitizenSignUp() {
  const { setAuthUser } = useAuthContext();
  let initialValues = {
    firstName: "",
    middleName:"",
    lastName: "",
    address:"",
    email: "",
    contact: "",
    password: ""
  };

  let { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: async (value, action) => {
        console.log(value);
        action.resetForm();
        try {
          const response = await fetch("http://localhost:3500/registerCitizen", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
    
          const data = await response.json();
          localStorage.setItem("citycare", JSON.stringify(data));
			    setAuthUser(data);
          // Handle the response data as needed.
          console.log(data);
        } catch (error) {
          console.error("Error submitting the form:", error);
        }
      },
    });
 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName ? (
                  <Alert severity="error">{errors.firstName}</Alert>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="middleName"
                  required
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  value={values.middleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.middleName && touched.middleName ? (
                  <Alert severity="error">{errors.middleName}</Alert>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName ? (
                  <Alert severity="error">{errors.lastName}</Alert>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Id"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <Alert severity="error">{errors.email}</Alert>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contact"
                  label="Contact"
                  type="contact"
                  id="contact"
                  autoComplete="new-contact"
                  value={values.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.contact && touched.contact ? (
                  <Alert severity="error">{errors.contact}</Alert>
                ) : null}
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
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <Alert severity="error">{errors.password}</Alert>
                ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex">
              <Grid item>
                <NavLink
                  to={"/CitizenSignIn"}
                  variant="body2"
                  style={{
                    color: "#2196f3",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
