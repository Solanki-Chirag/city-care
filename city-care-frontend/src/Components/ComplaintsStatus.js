import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../context/AuthContext";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';

function ComplaintsStatus() {
  const { authUser } = useAuthContext();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints by email from the backend
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`http://localhost:3500/showStatus/${authUser.email}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    if (authUser && authUser.email) {
      fetchComplaints();
    }
  }, [authUser]);

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      flexDirection="column" 
      sx={{ p: 2, mt: 4 }}
    >
      <Typography variant="h4" gutterBottom>Your Complaints Status</Typography>
      <TableContainer 
        component={Paper} 
        sx={{ maxWidth: 800, width: '100%', p: 2 }}  // Adjust the maxWidth and padding
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Sr No.</strong></TableCell>
              <TableCell><strong>Area</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Complaint Date</strong></TableCell> {/* New Time column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.length > 0 ? (
              complaints.map((complaint, index) => (
                <TableRow key={complaint._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{complaint.area}</TableCell>
                  <TableCell>{complaint.department || 'N/A'}</TableCell> {/* Show department if it exists */}
                  <TableCell>
                    <span style={{ color: complaint.status === 'resolved' ? 'green' : 'black' }}>
                      {complaint.status}
                    </span>
                  </TableCell>
                  <TableCell>{complaint.time}</TableCell> {/* Display formatted time */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center"> {/* Adjusted to 5 for new column */}
                  No complaints found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ComplaintsStatus;
