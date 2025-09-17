import { NextResponse } from "next/server";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const webhookData = await req.json();
    console.log("Webhook received:", webhookData);

    // Transaction info nikal lo
    const transaction = webhookData?.data?.attributes;
    const referenceId = transaction?.referenceId; // Agar tumne orderId ya referenceId bheja tha transaction me

    const paymentStatus = transaction?.status; // "processed", "failed", etc.

    if (!referenceId) {
      return NextResponse.json({ error: "Order referenceId missing" }, { status: 400 });
    }

    // DB update
    const order = await Order.findById(referenceId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    order.paymentStatus = paymentStatus === "processed" ? "paid" : "failed";
    await order.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
