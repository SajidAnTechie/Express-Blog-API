const nodemailer = require("nodemailer");

const sendMailToUsers = async (username, email) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "f08ec6f972ad24",
      pass: "bc8882de0a200b",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "sajidansari33272@gmail.com", // sender address
    to: email, // list of receivers
    subject: `Congrats ${username}`, // Subject line
    text: "You have successfully registered an account", // plain text body
    html: "<p>Create Porjects and explore it. Happy journey</p>", // html body
  });
  console.log("Message sent: %s", info.messageId);
};

module.exports = sendMailToUsers;
