import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const Inbox = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:3500/complaints');
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
        paddingTop: '35px', // Adjust if needed for the height of your navbar
        paddingLeft: { xs: '16px', md: '120px' }, // Adjust for different screen sizes
        paddingRight: '16px',
        paddingBottom: '20px',
      }}
    >
      <Grid container spacing={2}>
        {complaints.map((complaint) => (
          <Grid item key={complaint._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '350px', // Adjusted height to accommodate more content
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '150px', // Fixed height for the image
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
                  <Typography variant="h6" component="div">
                    {complaint.citizenName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {complaint.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Area: {complaint.area}
                  </Typography>
                  {/* Display the complaint type and description */}
                  <Typography variant="body2" color="text.secondary">
                    Type: {complaint.complaintType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {complaint.description}
                  </Typography>
                </div>
                <CardActions sx={{ justifyContent: 'flex-end', mt: 'auto' }}>
                  <Button size="small" color="primary" onClick={() => handleAccept(complaint._id)}>
                    Accept
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleReject(complaint._id)}>
                    Reject
                  </Button>
                </CardActions>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Inbox;
