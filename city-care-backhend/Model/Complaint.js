const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10, // Ensure a minimum of 100 characters
  },
  image: {
    filename: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    imageBase64: {
      type: String,
      required: true,
    },
  },
  status: {
    type:String,
    default:"pending"
  },
  time: {
    type: Date,
    default: Date.now,  // Set default to current date and time
  },
});

module.exports = mongoose.model('Complaint', complaintSchema);
