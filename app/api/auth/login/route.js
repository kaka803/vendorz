// app/api/auth/login/route.js
import { connectDb } from "@/app/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function POST(req) {
  await connectDb();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // JWT token generate
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return NextResponse.json(
    { user: { id: user._id, name: user.name, email: user.email }, token },
    { status: 200 }
  );
}
