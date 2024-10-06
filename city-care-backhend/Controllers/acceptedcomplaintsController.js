const AcceptedComplaints = require('../Model/Accepted_Complaints');
const Complaint = require('../Model/Complaint');
const axios = require('axios'); // Import axios to make HTTP requests

const storeAcceptedComplaints = async (req, res) => {
  try {
    const { _id, area, email, description, image, time } = req.body;

    // Validate that necessary fields are provided
    if (!_id || !area || !email || !description || !image || !time) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    // Call the Python API to classify the complaint into a department
    const pythonApiUrl = 'http://localhost:5000/predict'; // Adjust the URL if needed
    let department;

    try {
      // Send the description to the Python API
      const response = await axios.post(pythonApiUrl, { description });

      // Log the full response for debugging
      console.log('Python API response:', response.data);

      // Check if the predicted department is in the response
      if (response.data && response.data.predicted_department) {
        department = response.data.predicted_department; // Extract department from the response
        console.log(`Department classified as: ${department}`);
      } else {
        console.error('No department found in the Python API response.');
        department = 'unknown'; // Set a default if department is not found
      }
    } catch (error) {
      console.error('Error calling the Python model API:', error);
      return res.status(500).send({ message: 'Error classifying complaint department' });
    }

    // Create a new accepted complaint with the existing _id and other details
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
      department, // Add the classified department
      acceptedAt: Date.now(), // Timestamp for when complaint was accepted
    });

    // Save the new accepted complaint
    await newComplaint.save();

    // Update the status and department in the original complaint document
    await Complaint.findByIdAndUpdate(
      _id,
      {
        status: 'accepted',
        department,  // Update the department in the original Complaint model
      },
      { new: true } // Return the updated document
    );

    res.status(201).send({ message: 'Complaint accepted and department classified successfully', complaintId: newComplaint._id });
  } catch (error) {
    console.error('Error accepting complaint:', error);
    res.status(500).send({ message: 'Error accepting complaint' });
  }
};

module.exports = { storeAcceptedComplaints };
