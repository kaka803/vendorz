import { connectDb } from "@/app/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDb();
  try {
    const { email, password } = await req.json();
    if (!email || !password) return new Response(JSON.stringify({ error: "Email & password required" }), { status: 400 });

    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

    const valid = await user.comparePassword(password);
    if (!valid) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    const userObj = { id: user._id, name: user.name, email: user.email };
    return new Response(JSON.stringify({ user: userObj, token }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
