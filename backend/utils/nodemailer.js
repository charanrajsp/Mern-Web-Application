// utils/email.js
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any other email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const verificationLink = `http://localhost:5000/api/company/verify/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the link: ${verificationLink}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
