const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  // This is the 16-character App Password
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: `"SaveBite 🥗" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      ...(html ? { html } : { text }),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📩 Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("❌ Email failed:", error);
    throw error;
  }
};

module.exports = sendEmail;