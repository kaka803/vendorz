// app/api/auth/me/route.js
import { connectDb } from "@/app/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function POST(req) {
  await connectDb();

  try {
    // Frontend se token body me aa raha h
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json(
        { error: "Token not provided" },
        { status: 401 }
      );
    }

    // Token verify aur decode
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // User data frontend ko bhej do
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid token or session expired" },
      { status: 401 }
    );
  }
}
