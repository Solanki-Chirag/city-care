import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";

const DepartmentInbox = () => {
  const [complaints, setComplaints] = useState([]);
  const { department } = useParams();
  useEffect(() => {
    // Store the department in local storage if needed
    localStorage.setItem("department", department);
}, [department]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`http://localhost:3500/DepartmentComplaints/department?department=${department}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComplaints(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleAccept = (complaintId) => {
    console.log(`Accepted complaint with ID: ${complaintId}`);
  };

  const handleReject = (complaintId) => {
    console.log(`Rejected complaint with ID: ${complaintId}`);
  };

  return (
    <Container
      sx={{
        paddingTop: '35px',
        paddingLeft: { xs: '16px', md: '120px' },
        paddingRight: '16px',
        paddingBottom: '20px',
      }}
    >
      {/* <h1 className="text-2xl font-bold text-center">
        {`${department}`} Inbox
      </h1> Display department name in the inbox */}
      <Grid container spacing={2}>
        {complaints.map((complaint) => (
          <Grid item key={complaint._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '350px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={`data:${complaint.image.contentType};base64,${complaint.image.imageBase64}`}
                  alt="Problem"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div
                style={{
                  padding: '16px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  
                  <Typography variant="body2" color="text.secondary">
                    {complaint.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Area: {complaint.area}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Description: {complaint.description}
                  </Typography>
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
