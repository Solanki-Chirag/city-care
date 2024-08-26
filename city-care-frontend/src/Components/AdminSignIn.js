import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { AdminSignInSchema } from "../Schemas";
import Alert from "@mui/material/Alert";
import { NavLink,useNavigate} from "react-router-dom";

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
      </NavLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminSignIn() {
  const history=useNavigate();


  let initialValues = {
    id: "",
    password: "",
  };
  const [success, setsuccess] = React.useState(false);
  const [submit, setsubmit] = React.useState(false);
  let { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AdminSignInSchema,
      onSubmit: async (value, action) => {
        setsubmit(true);
        console.log(value);
        action.resetForm(initialValues);
        try {
          const response = await fetch("http://localhost:3500/AdminSignIn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(values),
          });
          if (!response.ok) {
            setsuccess(false); // Login unsuccessful
            console.log("Login failed. Please check your credentials.");
            return;
          }
          
          setsuccess(true);
          action.resetForm(initialValues); // Login successful
          const data = await response.json();

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
      {success && submit && (
        history("/AdminDashboard")
      )}
      {(
        !success && submit && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg--800 dark:text-red-400" role="alert">
             !Invalid Id and Password
          </div>
        )
      )}
       
      
        
          
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="id"
              label="Id"
              name="id"
              value={values.id}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.id && touched.id ? (
              <Alert severity="error">{errors.id}</Alert>
            ) : null}
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <Alert severity="error">{errors.password}</Alert>
            ) : null}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}