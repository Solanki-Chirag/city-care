import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function ChooseUserType({ user, setUser }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setUser(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "Citizen") {
      navigate("/CitizenSignIn");
    } else if (user === "Admin") {
      navigate("/AdminSignIn");
    } else if (user === "Department") {
      navigate("/DepartmentSignIn", { state: { department: selectedDepartment } });
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
                <FormControlLabel
                  value="Department"
                  control={<Radio color="default" />}
                  label="Department"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Show department selection if Department is selected */}
          {selectedValue === "Department" && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Department
                  </MenuItem>
                  <MenuItem value="Road Department">Road Department</MenuItem>
                  <MenuItem value="Sewage Department">Sewage Department</MenuItem>
                  <MenuItem value="Waste Management Department">
                    Waste Management Department
                  </MenuItem>
                  <MenuItem value="Street Light Department">
                    Street Light Department
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}

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
