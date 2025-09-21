// api/auth/forgot-password/route.js
import { connectDb } from "@/app/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/lib/mail";

export async function POST(req) {
  try {
    await connectDb();
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // prevent user enumeration
      return new Response(
        JSON.stringify({ message: "If that email exists, you’ll get a reset link." }),
        { status: 200 }
      );
    }

    // JWT token with userId + 1 hour expiry
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      html: `
        <p>You requested a password reset.</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link is valid for 1 hour.</p>
      `,
    });

    return new Response(JSON.stringify({ message: "Reset email sent" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
