import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ProblemReportSchema } from "../Schemas";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <NavLink color="inherit" to={"/"}>
        City Care
      </NavLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Complaint() {
  const [file, setFile] = React.useState(null); // Initialize as null
  const [fileError, setFileError] = React.useState("");

  const formik = useFormik({
    initialValues: {
      area: "",
      email: "",
      file: null
    },
    validationSchema: ProblemReportSchema,
    onSubmit: async (values, actions) => {
      console.log("hi");
      if (fileError || !file) {
        return; // Prevent submission if there's a file error or no file is selected
      }

      const formData = new FormData();
      formData.append("area", values.area);
      formData.append("email", values.email);
      formData.append("file", file);
      console.log(formData);
      try {
        const response = await fetch("http://localhost:3500/reportProblem", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Form submitted successfully:", data);
        actions.resetForm();
        setFile(null);
        setFileError("");
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    },
  });

  const onHandleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file && file.type.toLowerCase() === "image/jpeg") {
      setFile(file);
      setFileError(""); // Clear any previous error
    } else {
      setFile(null); // Clear the file if it's invalid
      setFileError("Please upload a valid JPEG image file.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CameraAltOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Report a Problem
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit} // Fixed Formik handleSubmit
            encType="multipart/form-data"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel id="area-label">Area</InputLabel>
                  <Select
                    labelId="area-label"
                    id="area"
                    name="area"
                    value={formik.values.area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Area"
                  >
                    <MenuItem value="Adajan">Adajan</MenuItem>
                    <MenuItem value="Athwa">Athwa</MenuItem>
                    <MenuItem value="Varachha">Varachha</MenuItem>
                    <MenuItem value="Rander">Rander</MenuItem>
                    <MenuItem value="Katargam">Katargam</MenuItem>
                    <MenuItem value="Vesu">Vesu</MenuItem>
                    <MenuItem value="Pal">Pal</MenuItem>
                    <MenuItem value="Dumas">Dumas</MenuItem>
                    <MenuItem value="Piplod">Piplod</MenuItem>
                    <MenuItem value="Udhna">Udhna</MenuItem>
                    <MenuItem value="Chowk Bazaar">Chowk Bazaar</MenuItem>
                  </Select>
                </FormControl>
                {formik.errors.area && formik.touched.area && <Alert severity="error">{formik.errors.area}</Alert>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && <Alert severity="error">{formik.errors.email}</Alert>}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <label
                    htmlFor="file_input"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-600 focus:outline-none dark:bg-white-700 dark:border-gray-400 dark:placeholder-gray-600 py-4 px-3 leading-tight focus:border-blue-500 focus:bg-white"
                  >
                    {file ? file.name : "Upload Problem Image *"}
                  </label>
                  <input
                    id="file_input"
                    type="file"
                    accept="image/jpeg"
                    onChange={onHandleFileChange}
                    className="sr-only" // This class visually hides the original input
                  />
                </FormControl>
                {fileError && <Alert severity="error">{fileError}</Alert>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
