const nodeMailer = require('nodemailer');
const env = require('../config/env');

// Function to send email
const sendEmail = async (options) => {
    // Create a transporter
    const transporter = nodeMailer.createTransport({
        host: env.emailHost,
        port: env.emailPort,
        auth: {
            user: env.emailUser,
            pass: env.emailPass,
        },
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
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;