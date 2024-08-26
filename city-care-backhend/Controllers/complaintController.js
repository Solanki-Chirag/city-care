const Complaint = require('../Model/Complaint');
const citizen = require("../model/Citizen");

const handleComplaintSubmission = async (req, res) => {
  try {
    const { area, email } = req.body;
    const { file } = req;
    console.log(area);
    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const newComplaint = new Complaint({
      area,
      email,
      image: {
        filename: file.originalname,
        contentType: file.mimetype,
        imageBase64: file.buffer.toString('base64'), // Convert image to Base64
      },
    });

    await newComplaint.save();

    res.status(201).send({ message: 'Complaint submitted successfully', complaintId: newComplaint._id });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).send({ message: 'Error submitting complaint' });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().lean();

    // Fetch the corresponding citizen names based on email
    const complaintsWithCitizenNames = await Promise.all(
      complaints.map(async (complaint) => {
        const Citizen = await citizen.findOne({ email: complaint.email });
        return {
          ...complaint,
          citizenName: Citizen ? Citizen.firstName : 'Unknown Citizen',
        };
      })
    );

    res.status(200).json(complaintsWithCitizenNames);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).send({ message: 'Error fetching complaints' });
  }
};

module.exports = { handleComplaintSubmission , getAllComplaints};
