const express = require('express');
const router = express.Router();
const updateComplaintStatusController = require('../Controllers/updateComplaintStatusController');

// Route to get all complaints
router.put('/:id', updateComplaintStatusController.updateComplaintStatus);

module.exports = router;