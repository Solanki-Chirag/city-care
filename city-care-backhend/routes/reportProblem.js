const express = require('express');
const multer = require('multer');
const { handleComplaintSubmission } = require('../Controllers/complaintController');

const router = express.Router();

// Multer setup: store in memory
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG files are allowed.'));
        }
    }
});

// Route to handle complaint submission
router.post('/', upload.single('file'), handleComplaintSubmission);

module.exports = router;
