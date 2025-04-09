const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    secure: false, 
    auth: {
      user: "2e1d179e401588",
      pass: "397fe3b7e9de9e",
    },
  });
module.exports = {
    sendMailForgotPassword: async function(to,URL){
        return await transporter.sendMail({
            to:to,
            subject:"THƯ THÔNG BÁO ĐỔI MẬT KHẨU",
            html:`<a href=${URL}>CLICK VAO DAY DE ĐỔI MAT KHAU </a>`
        })
    }
}