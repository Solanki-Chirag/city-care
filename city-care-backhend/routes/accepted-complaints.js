const express = require('express');
const router = express.Router();
const acceptedcomplaintsController = require('../Controllers/acceptedcomplaintsController');

// Route to get all complaints
router.post('/', acceptedcomplaintsController.storeAcceptedComplaints);

module.exports = router;