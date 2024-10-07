const AcceptedComplaint = require('../Model/Accepted_Complaints');

// Controller to update the status of a specific complaint
const updateComplaintStatus = async (req, res) => {
  const id = req.params.id; // Extracting id from the query parameters
  const { status } = req.body;
    console.log(id,status);
  // Check if id is provided
  if (!id) {
    return res.status(400).json({ message: "Complaint ID is required." });
  }

  try {
    // Find the complaint by its ID and update its status
    const complaint = await AcceptedComplaint.findByIdAndUpdate(
      id, // Use id directly instead of wrapping it in an object
      { status: status },
      { new: true } // Returns the updated document
    );

    if (complaint) {
      res.status(200).json({ message: "Complaint status updated successfully", complaint });
    } else {
      res.status(404).json({ message: "Complaint not found" });
    }
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updateComplaintStatus,
};
