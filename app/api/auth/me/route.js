import { connectDb } from "@/app/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDb();
    const { token } = await req.json();
    if (!token) return new Response(JSON.stringify({ error: "No token provided" }), { status: 400 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid token or expire token" }), { status: 401 });
  }
}
