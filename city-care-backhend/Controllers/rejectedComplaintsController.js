const Complaint = require('../Model/Complaint'); // Import the Complaint model

const RejectedComplaints = async (req, res) => {
  try {
    const { _id } = req.body;

    // Validate that the complaint ID is provided
    if (!_id) {
      return res.status(400).send({ message: 'Complaint ID is required' });
    }

    // Find the complaint by ID and update its status to 'rejected'
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      _id,
      { status: 'rejected' }, // Update the status field to 'rejected'
      { new: true } // Return the updated document
    );

    // If the complaint doesn't exist, return a 404 error
    if (!updatedComplaint) {
      return res.status(404).send({ message: 'Complaint not found' });
    }

    res.status(200).send({ message: 'Complaint rejected successfully', complaintId: updatedComplaint._id });
  } catch (error) {
    console.error('Error rejecting complaint:', error);
    res.status(500).send({ message: 'Error rejecting complaint' });
  }
};

module.exports = { RejectedComplaints };
