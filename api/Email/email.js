const nodemailer = require('nodemailer');
const email = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: emailPassword,
  },
});

async function sendMail(to, subject, text) {
  const mailOptions = {
    from: email,
    to,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
