import { NextResponse } from "next/server";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const webhookData = await req.json();
    console.log("Webhook received:", webhookData);

    // Included array me se transaction attributes nikal lo
    const charge = webhookData.included?.[0];
    console.log('charge info',charge);
    
    if (!charge) {
      return NextResponse.json({ error: "Charge info missing" }, { status: 400 });
    }

    const referenceId = charge.attributes?.referenceId; // orderId jo aapne transaction me bheja
    const paymentStatus = charge.attributes?.status;
    
    console.log('referenceId:', referenceId);
    console.log('paymentStatus:', paymentStatus);
    // "processed", "failed", etc.

    if (!referenceId) {
      return NextResponse.json({ error: "Order referenceId missing" }, { status: 400 });
    }

    // DB update
const order = await Order.findOne({ referenceId: referenceId }); // agar orderId same hai to
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
