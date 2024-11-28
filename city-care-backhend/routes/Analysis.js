const express = require('express');
const router = express.Router();
const AnalysisController = require('../Controllers/AnalysisController');

// Route to get all complaints
router.get('/', AnalysisController.getReceivedComplaints);

module.exports = router;