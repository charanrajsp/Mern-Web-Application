const express = require('express');
const { postJob, sendJobEmails } = require('../controller/jobController.js');
const { authenticate } = require('../middleware/authMiddleware.js');
const router = express.Router();

// Post a Job
router.post('/post', authenticate, postJob);

// Send Job Emails to Candidates
router.post('/send-job-alerts', authenticate, sendJobEmails);

module.exports = router;
