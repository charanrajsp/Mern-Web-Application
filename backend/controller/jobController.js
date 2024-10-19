const Job = require('../models/Job');
const nodemailer = require('../utils/nodemailer.js');

// Post a Job
exports.postJob = async (req, res) => {
  const { title, description, experienceLevel, endDate } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      experienceLevel,
      endDate,
      companyId: req.company.companyId
    });

    await newJob.save();
    res.json({ msg: 'Job posted successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Send Job Emails
exports.sendJobEmails = async (req, res) => {
  const { emails, jobDetails } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    emails.forEach(email => {
      const mailOptions = {
        from: 'no-reply@jobboard.com',
        to: email,
        subject: `New Job Posting: ${jobDetails.title}`,
        text: `Hello, check out this new job: ${jobDetails.description}`
      };

      transporter.sendMail(mailOptions);
    });

    res.json({ msg: 'Emails sent successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
