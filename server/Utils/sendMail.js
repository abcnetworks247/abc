const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
    logger: true, // log to console
    debug: true, // debug info
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL, // Verified sender email
    to: options.email, // Destination email
    subject: options.subject, // Subject line
    html: options.html, // HTML content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

module.exports = sendMail;
