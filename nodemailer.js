const nodemailer = require('nodemailer');

async function sendEmail(email, subject, message) {
    let transporter = nodemailer.createTransport({
        host: '2525',
        port: 587,
        secure: false,
        auth: {
            user: 'jaingeetansh@example.com',
            pass: 'cbnxjzbqgctiwqji'
        }
    });

    let info = await transporter.sendMail({
        from: 'jaingeetansh@gmail.com',
        to: email,
        subject: subject,
        text: ""
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
