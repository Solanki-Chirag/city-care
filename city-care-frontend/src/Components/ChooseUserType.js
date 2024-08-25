import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ChooseUserType({ user, setUser }) {
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setUser(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    {
      user === "Citizen" ? navigate("/CitizenSignIn") : navigate("/AdminSignIn");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f0f0"
    >
      <form
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Box textAlign="center" marginBottom="20px">
          <h2 style={{ color: "#4caf50", fontWeight: "bold" }}>
            Choose User Type:
          </h2>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="user-type"
                name="row-radio-buttons-group"
                value={selectedValue}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Citizen"
                  control={<Radio color="primary" />}
                  label="Citizen"
                />
                <FormControlLabel
                  value="Admin"
                  control={<Radio color="secondary" />}
                  label="Admin"
                />
               
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#4caf50",
                color: "#ffffff",
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
