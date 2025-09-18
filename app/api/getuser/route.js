import User from "@/models/User";
import { connectDb } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();
        const users = await User.find({});
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
