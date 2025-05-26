const nodemailer = require("nodemailer");

const emailHelper = async (to, subject, code) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "entornoshoteleria@gmail.com",
      pass: "kixm cksy sowj wfak"
    }
  });

  let mailOptions = {
    from: "entornoshoteleria@gmail.com",
    to: to,
    subject: subject,
    text: "Su código de verificación es: " + code
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
  } catch (error) {
    console.error("Error al enviar el email:", error);
    throw error;
  }
};

module.exports = emailHelper;
