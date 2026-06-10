const nodemailer = require('nodemailer');
// nodemailer lets Node.js send emails using SMTP

// Create a reusable transporter
// A transporter is the email-sending connection — like signing into Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  // Tell nodemailer we're using Gmail's SMTP server
  // Other options: 'outlook', 'yahoo', or a custom host/port

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    // These come from your .env file
    // For Gmail: EMAIL_PASS should be an App Password
    // (Google Account → Security → App Passwords → generate one)
    // Never use your real Gmail password here
  },
});

const sendEmail = async ({ to, subject, html }) => {
  // async because sending email is a network operation — takes time
  // We destructure the argument: { to, subject, html }
  // instead of email.to, email.subject etc.

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    // The "from" name shown in the inbox
    to,
    subject,
    html,
    // html means the email body can contain HTML for nice formatting
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;