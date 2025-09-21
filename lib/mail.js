// lib/mail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // your Gmail/SMTP email
        pass: process.env.SMTP_PASS, // your Gmail/SMTP app password
      },
    });

export async function sendEmail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
  return info;
}
