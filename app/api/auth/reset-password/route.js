// api/auth/reset-password/route.js
import { connectDb } from "@/app/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDb();
    const { token, password } = await req.json();

    if (!token || !password) {
      return new Response(JSON.stringify({ error: "Token and password are required" }), { status: 400 });
    }

    // verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Token invalid or expired" }), { status: 400 });
    }

    // find user by id
    const user = await User.findById(decoded.id);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // update password
    user.password = password; // pre-save hook will hash
    await user.save();

    return new Response(JSON.stringify({ message: "Password reset successful" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
