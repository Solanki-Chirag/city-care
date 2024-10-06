const Complaint = require('../Model/Complaint');
const citizen = require("../model/Citizen");

const handleComplaintSubmission = async (req, res) => {
  try {
    const { area, email, description } = req.body; // Extract the new fields
    const { file } = req;

    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const newComplaint = new Complaint({
      area,
      email,
      description, // Add description
      image: {
        filename: file.originalname,
        contentType: file.mimetype,
        imageBase64: file.buffer.toString('base64'), // Convert image to Base64
      },
      status:"pending",
    });

    await newComplaint.save();

    res.status(201).send({ message: 'Complaint submitted successfully', complaintId: newComplaint._id });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).send({ message: 'Error submitting complaint' });
  }
};

const getAllComplaints = async (req, res) => {
  function truncateText(text, maxLines, lineHeight = 1.2) {
    // Estimate the number of characters per line (This may need adjustment based on your actual use case)
    const charactersPerLine = 40; // Adjust this value as needed
    const maxChars = maxLines * charactersPerLine;
  
    if (text.length <= maxChars) {
      return text;
    }
  
    return text.slice(0, maxChars) + '...';
  }
  
  try {
    const complaints = await Complaint.find({ status: 'pending' }).lean();

    // Fetch the corresponding citizen names based on email
    const complaintsWithCitizenNames = await Promise.all(
      complaints.map(async (complaint) => {
        const Citizen = await citizen.findOne({ email: complaint.email });
        const truncatedDescription = truncateText(complaint.description, 2);
        
        return {
          ...complaint,
          citizenName: Citizen ? Citizen.firstName : 'Unknown Citizen',
          description: truncatedDescription, // Truncated description
        };
      })
    );

    res.status(200).json(complaintsWithCitizenNames);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).send({ message: 'Error fetching complaints' });
  }
};

module.exports = { handleComplaintSubmission, getAllComplaints };
