import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // ✅ Transporter setup (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // your Gmail/SMTP email
        pass: process.env.SMTP_PASS, // your Gmail/SMTP app password
      },
    });

    // ✅ 1. Send mail to Admin
    await transporter.sendMail({
      from: `"3dvendorz Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // admin email address
      subject: `📩 New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // ✅ 2. Auto-response to User
    await transporter.sendMail({
      from: `"3dvendorz" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message - 3dvendorz",
      text: `Hello!

Thank you for reaching out to 3dvendorz. We have received your message and our team is currently reviewing your inquiry. We strive to respond to all requests within 5 business days.

Best Regards,
3dvendorz`,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email" }),
      { status: 500 }
    );
  }
}
