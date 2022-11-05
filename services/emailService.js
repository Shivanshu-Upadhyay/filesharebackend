const nodeMailer = require("nodemailer");

module.exports = async function sendMail({ from, to, subject, text, html }) {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MASTER_PASS,
    },
  });
  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

};
