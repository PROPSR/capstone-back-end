const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { createTransport } = require("nodemailer");
const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.BREVO_LOGIN,
      pass: process.env.BREVO_PASSWORD,
    },
  });
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
    }
  });
  
    const sendEmail = async (from, to, subject, html, replyTo) => {
    return new Promise((resolve, reject) => {
      transporter.sendMail({ from, to, subject, html, replyTo }, (err, info) => {
        if (err) {
          console.log("mail_error ==>", err);
          return reject(err);
        }
        resolve(info);
      });
    });
  };

  module.exports = {
    sendEmail
  }