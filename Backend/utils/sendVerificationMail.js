


const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

// Load environment variables and verify
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
  throw result.error;
}

console.log('Environment variables loaded:', {
  EMAIL_USER: process.env.EMAIL_USER ? 'exists' : 'missing',
  EMAIL_PASS: process.env.EMAIL_PASS ? 'exists' : 'missing',
  BASE_URL: process.env.BASE_URL || 'not set, using default'
});

const sendVerificationMail = async (email, token) => {
    console.log("Attempting to send email to:", email);
    console.log("Using email user:", process.env.EMAIL_USER);

    try {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // only for testing, remove in production
            }
        });

        // Verify transporter connection
        await transporter.verify();
        console.log('Server is ready to take our messages');

        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
        const verificationUrl = `${baseUrl}/verify?token=${token}`;

        const mailOptions = {
            from: `"Your App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Email Verification',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #2563eb;">Email Verification</h1>
                    <p>Please click the button below to verify your email:</p>
                    <a href="${verificationUrl}" 
                       style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">
                        Verify Email
                    </a>
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p style="word-break: break-all;">${verificationUrl}</p>
                    <p style="margin-top: 20px; color: #6b7280; font-size: 0.9rem;">
                        If you didn't request this, please ignore this email.
                    </p>
                </div>
            `,
        };

        console.log("Sending email...");
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

module.exports = sendVerificationMail;


