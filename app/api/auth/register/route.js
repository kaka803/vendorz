import { connectDb } from "@/app/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();
    const { name, email, password } = body;
    if (!email || !password) return new Response(JSON.stringify({ error: "Email & password required" }), { status: 400 });

    const exists = await User.findOne({ email });
    if (exists) return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });

    const user = new User({ name, email, password });
    await user.save();

    const userObj = { id: user._id, name: user.name, email: user.email };
    return new Response(JSON.stringify({ user: userObj }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
