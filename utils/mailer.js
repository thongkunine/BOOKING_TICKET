const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, 
    auth: {
      user: "2e1d179e401588",
      pass: "397fe3b7e9de9e",
    },
  });
module.exports = {
    sendMailForgotPassword: async function(to, URL){
        try {
            return await transporter.sendMail({
                from: "noreply@badminton.com",
                to: to,
                subject: "THƯ THÔNG BÁO ĐỔI MẬT KHẨU",
                html: `<p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết bên dưới để đặt lại mật khẩu:</p>
                       <p><a href="${URL}">Đặt lại mật khẩu</a></p>
                       <p>Liên kết này sẽ hết hạn sau 10 phút.</p>
                       <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>`
            });
        } catch (error) {
            console.error("Lỗi gửi email:", error);
            throw new Error("Không thể gửi email đặt lại mật khẩu");
        }
    }
}