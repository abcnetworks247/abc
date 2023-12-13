const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    // secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);

};

module.exports = sendMail;
