const AcceptedComplaint = require('../Model/Accepted_Complaints');

// Controller to fetch complaints for a specific department
const getDepartmentComplaints = async (req, res) => {
  const { department } = req.query; 
  //console.log(department);

  try {
    // Fetch complaints where the department matches the query
    const complaints = await AcceptedComplaint.find({ department });
    
    
    if (complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found for this department' });
    }

    res.json(complaints); // Return the complaints in the response
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getDepartmentComplaints,
};
