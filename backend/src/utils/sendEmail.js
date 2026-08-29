const nodeMailer = require('nodemailer');
const env = require('../config/env');

// Function to send email
const sendEmail = async (options) => {
    const port = Number(env.emailPort) || 587;

    // Create a transporter
    const transporter = nodeMailer.createTransport({
        host: env.emailHost,
        port,
        secure: port === 465,
        auth: {
            user: env.emailUser,
            pass: env.emailPass,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
    });

    // Define the email options
    const mailOptions = {
        from: `Qalam Academy <${env.emailUser}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    // Send the email
    return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
