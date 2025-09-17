// app/api/auth/register/route.js
import { connectDb } from "@/app/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function POST(req) {
  await connectDb();

  const { name, email, password } = await req.json();
  console.log("user data:", name, email, password);

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email and password are required" },
      { status: 400 }
    );
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  // Return user + token
  return NextResponse.json(
    { user: { id: user._id, name: user.name, email: user.email }, token },
    { status: 201 }
  );
}
