const nodemailer = require('nodemailer');

const sendResetPasswordEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Please click the link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendResetPasswordEmail };
