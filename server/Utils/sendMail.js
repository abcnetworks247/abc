const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (options) => {
  if (!options || !options.email || !options.subject || !options.html) {
    throw new Error("Missing required email options");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT == "465", // Secure for port 465
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
    requireTLS: true,
    logger: true,
    debug: true,
  });

  const mailOptions = {
    from: `"Your Name" <${process.env.SMTP_MAIL}>`, // More standard format
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error("Email sending failed");
  }
};

module.exports = sendMail;
