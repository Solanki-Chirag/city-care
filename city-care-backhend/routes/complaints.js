const express = require('express');
const router = express.Router();
const complaintController = require('../Controllers/complaintController');

// Route to get all complaints
router.get('/', complaintController.getAllComplaints);

module.exports = router;