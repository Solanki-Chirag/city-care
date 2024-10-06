const express = require('express');
const { getDepartmentComplaints } = require('../Controllers/complaintsController');

const router = express.Router();

router.get('/department', getDepartmentComplaints);

module.exports = router;
