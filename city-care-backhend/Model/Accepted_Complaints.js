const mongoose = require('mongoose');

const acceptedComplaintsSchema = new mongoose.Schema({
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
    minlength: 10,
  },
  department:{
    type:String
  },
  status:{
    type:String,
    default:"acccepted",
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
  time:{
    type: Date,
  },
  acceptedAt: {
    type: Date,
    default: Date.now, // Automatically sets the time when the complaint is accepted
  },
});

module.exports = mongoose.model('AcceptedComplaint', acceptedComplaintsSchema);
