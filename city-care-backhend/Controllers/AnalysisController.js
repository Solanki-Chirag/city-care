const Complaint = require('../Model/Complaint');
const AcceptedComplaint = require('../Model/Accepted_Complaints');

// Controller to fetch total number of complaints and department-specific counts
const getReceivedComplaints = async (req, res) => {
  try {
    // Count the total number of complaints in the Complaint collection
    const receivedComplaints = await Complaint.countDocuments({});

    // Count complaints for each department and status in the AcceptedComplaint collection
    const departmentCounts = {
      RoadAccepted: await AcceptedComplaint.countDocuments({ department: "Road Department", status: "accepted" }),
      StreetAccepted: await AcceptedComplaint.countDocuments({ department: "Street Light Department", status: "accepted" }),
      SewageAccepted: await AcceptedComplaint.countDocuments({ department: "Sewage Department", status: "accepted" }),
      WasteAccepted: await AcceptedComplaint.countDocuments({ department: "Waste Management Department", status: "accepted" }),

      RoadResolved: await AcceptedComplaint.countDocuments({ department: "Road Department", status: "resolved" }),
      StreetResolved: await AcceptedComplaint.countDocuments({ department: "Street Light Department", status: "resolved" }),
      SewageResolved: await AcceptedComplaint.countDocuments({ department: "Sewage Department", status: "resolved" }),
      WasteResolved: await AcceptedComplaint.countDocuments({ department: "Waste Management Department", status: "resolved" }),
      Rejected: await Complaint.countDocuments({status: "rejected" }),
    };

    // Combine all counts into the response
    res.status(200).json({
      success: true,
      receivedComplaints,
      ...departmentCounts,
    });
  } catch (error) {
    console.error('Error fetching complaints count:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching complaints count",
    });
  }
};

module.exports = {
  getReceivedComplaints,
};
