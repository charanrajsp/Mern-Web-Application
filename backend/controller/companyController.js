const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Company = require('../models/Company.js'); // Adjust the path to your Company model if necessary

// Register company function

exports.registerCompany = async (req, res) => {
  try {
      const { name,email, password } = req.body;

      console.log('Request body:', req.body);  // Log request body to check input

      // Check if company already exists
      let company = await Company.findOne({ email });
      if (company) {
          return res.status(400).json({ msg: 'Company already exists' });
      }

      // Create new company
      company = new Company({
        name,  
        email,
          password,
          isVerified: false, // Initially set to false
      });

      console.log('Company created but not saved:', company);  // Log company before saving

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      company.password = await bcrypt.hash(password, salt);

      await company.save();
      console.log('Company saved to DB:', company);  // Log after save

      // Generate JWT token for email verification
      const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Generated JWT token:', token);  // Log token
      console.log('JWT_SECRET:', process.env.JWT_SECRET);

      res.status(200).json({ msg: 'Company registered, please verify your email', token });
  } catch (error) {
      console.error('Error during company registration:', error);  // Log exact error details
      res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Verify Email function
exports.verifyEmail = async (req, res) => {
  try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let company = await Company.findById(decoded.id);
      if (!company) {
          return res.status(400).json({ msg: 'Invalid token' });
      }

      company.isVerified = true;
      await company.save();

      res.status(200).json({ msg: 'Email verified successfully' });
  } catch (error) {
      console.error('Error during email verification:', error); // Log the error details
      res.status(500).json({ msg: 'Server error' });
  }
};

// Login company function
exports.loginCompany = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if company exists and is verified
      let company = await Company.findOne({ email });
      if (!company || !company.isVerified) {
          return res.status(400).json({ msg: 'Invalid credentials or email not verified' });
      }

      const isMatch = await bcrypt.compare(password, company.password);
      if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate JWT token for authentication
      const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({
        msg: "Login successful",
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };