const express = require('express');
const router = express.Router();
const showStatusController = require('../Controllers/showStatusController');

// Route to get all complaints
router.get('/:email', showStatusController.showStatus);

module.exports = router;