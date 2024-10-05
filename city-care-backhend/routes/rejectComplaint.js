const express = require('express');
const router = express.Router();
const rejectedComplaintsController = require('../Controllers/rejectedComplaintsController');

// Route to get all complaints
router.post('/', rejectedComplaintsController.RejectedComplaints);

module.exports = router;