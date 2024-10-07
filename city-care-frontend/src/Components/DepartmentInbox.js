import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useParams } from "react-router-dom";

const DepartmentInbox = () => {
  const [complaints, setComplaints] = useState([]);
  const [status, setStatus] = useState({});
  const { department } = useParams();

  useEffect(() => {
    localStorage.setItem("department", department);
  }, [department]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          `http://localhost:3500/DepartmentComplaints/department?department=${department}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComplaints(Array.isArray(data) ? data : []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setComplaints([]); // Fallback to an empty array on error
      }
    };
    

    fetchComplaints();
  }, [department]);

  const handleStatusChange = (id, newStatus) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [id]: newStatus,
    }));
  };

  const updateStatus = async (id) => {
    const selectedStatus = status[id];
    if (!selectedStatus) {
      alert("Please select a status.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3500/updateComplaintStatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedStatus }), // Send the selected status
      });
      if (response.ok) {
        
        // Refetch complaints to update the UI after status change
        try {
          const response = await fetch(
            `http://localhost:3500/DepartmentComplaints/department?department=${department}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setComplaints(Array.isArray(data) ? data : []); // Ensure it's always an array
        } catch (error) {
          console.error("Error fetching complaints:", error);
          setComplaints([]); // Fallback to an empty array on error
        }
      } else {
        throw new Error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Container
      sx={{
        paddingTop: "35px",
        paddingLeft: { xs: "16px", md: "120px" },
        paddingRight: "16px",
        paddingBottom: "20px",
      }}
    >
      <Grid container spacing={2}>
        {complaints.map((complaint) => (
          <Grid item key={complaint._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "400px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`data:${complaint.image.contentType};base64,${complaint.image.imageBase64}`}
                  alt="Problem"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  padding: "16px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Email: {complaint.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Area: {complaint.area}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(complaint.time).toLocaleDateString("en-GB")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {complaint.description}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ marginTop: "10px" }}>
                  Status: {complaint.status || "Pending"}
                </Typography>

                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Select
                    value={status[complaint._id] || ""}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    displayEmpty
                    fullWidth
                    sx={{
                      height: "35px",
                    }}
                  >
                    <MenuItem value="" disabled>
                      Update Status
                    </MenuItem>
                    <MenuItem value="inProgress">In Progress</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                  </Select>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateStatus(complaint._id)}
                    sx={{ height: "35px" }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DepartmentInbox;
