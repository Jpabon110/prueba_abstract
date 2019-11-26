const Nodemailer = require('nodemailer');


const EMAIL_USER = process.env.EMAIL_USER;
const PASSWORD_USER = process.env.PASSWORD_USER;

const transporter = Nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: PASSWORD_USER,
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  sendInvitation = (params) => {
    const { to, subject = 'Invitación para partido', name, id, playerId } = params;
    const mailOptions = {
      from: process.env.FROM_MAIL,
      to,
      subject,
      html: `<p>Hola ${name} has sido invitado a un partido, en el siguiente link puedes revisarlo: <a href="${process.env.APP_URL_BASE}/response/${id}/${playerId}">Aqui</a></p>`,
    };
    console.log('mailOptions', mailOptions);
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }


module.exports = {
    sendInvitation,
}