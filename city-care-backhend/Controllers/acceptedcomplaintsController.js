const AcceptedComplaints = require('../Model/Accepted_Complaints');
const Complaint = require('../Model/Complaint');

const storeAcceptedComplaints = async (req, res) => {
  try {
    const { _id, area, email, description, image,time } = req.body;

    // Validate that necessary fields are provided
    if (!_id || !area || !email || !description || !image || !time) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    // Create a new complaint with the existing _id and other details
    const newComplaint = new AcceptedComplaints({
      _id,  // Use the original complaint ID
      area,
      email,
      description, 
      image: {
        filename: image.filename,
        contentType: image.contentType,
        imageBase64: image.imageBase64, // Image is already in base64 format
      },
      time,
      acceptedAt: Date.now(), // You can add an accepted timestamp if required
    });

    // Save the new complaint
    await newComplaint.save();

    await Complaint.findByIdAndUpdate(
        _id,
        { status: 'accepted' },  // Update the status field
        { new: true } // Return the updated document
      );

    res.status(201).send({ message: 'Complaint accepted successfully', complaintId: newComplaint._id });
  } catch (error) {
    console.error('Error accepting complaint:', error);
    res.status(500).send({ message: 'Error accepting complaint' });
  }
};

module.exports = { storeAcceptedComplaints };
