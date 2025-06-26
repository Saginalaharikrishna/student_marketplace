// utils/nodemailer.js

const nodemailer = require('nodemailer');

// Load environment variables from .env (optional if already done in app.js)
require('dotenv').config();

// Environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS // App password from Gmail
  }
});

const sendMail = async (to, otp) => {
  const mailOptions = {
    from: EMAIL_USER, // ✅ should match the authenticated user
    to,
    subject: 'Student Marketplace - Password Reset OTP',
    text: `Hello,\n\nYour OTP to reset your password is: ${otp}\nIt will expire in 10 minutes.\n\nThank you,\nStudent Marketplace Team`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
