import Order from "@/models/Order";
import { connectDb } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    // Sort orders by newest first
    const orders = await Order.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }   
}
