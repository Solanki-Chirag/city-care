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
});

module.exports = mongoose.model('Complaint', complaintSchema);