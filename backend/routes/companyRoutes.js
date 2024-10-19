const express = require('express');
const { registerCompany, verifyEmail, loginCompany } = require('../controller/companyController.js');
const { check } = require('express-validator');
const router = express.Router();

// Register company
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  registerCompany
);

// Verify Email
router.get('/verify-email/:token', verifyEmail);

// Login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginCompany
);

  

module.exports = router;
