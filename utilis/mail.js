const nodemailer = require("nodemailer");

const sendMailToUsers = async (options) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: `Congrats ${options.name}`,
    text: "You have successfully registered an account",
    html: "<p>Create Porjects and explore it. Happy journey</p>",
  });
  console.log("Message sent: %s", info.messageId);
};

module.exports = sendMailToUsers;
