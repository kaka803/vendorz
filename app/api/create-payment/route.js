import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDb } from "@/app/lib/db";
export async function POST(req) {
  await connectDb();
  try {
    
    const { shippingAddress, products, subtotal, total, UserEmail } = await req.json();
    const amountString = total?.toFixed(2)
    console.log(amountString);
    const referenceId = "order_" + Date.now(); // Unique order ID
    
    const response = await fetch("https://api.exactly.com/api/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Api-Key ${process.env.EXACTLY_API_KEY}`
      },
      body: JSON.stringify({
        data: {
          type: "charge",
          attributes: {
            projectId: process.env.NEXT_PUBLIC_EXACTLY_PROJECT_ID,
            paymentMethod: "card" ,
            amount: amountString, // Amount in cents
            currency: "USD",
            referenceId: referenceId,
          }
        }
      })
    });

    const data = await response.json(); // JSON parse
    console.log(data.included[0].attributes.url);
      const hostedUrl = data.included[0].attributes.url;


      const newOrder = await Order.create({
      shippingAddress,
      products,
      subtotal,
      total,
      exactlyPaymentUrl: hostedUrl,
      paymentStatus: "pending",
      UserEmail: UserEmail,
      referenceId: referenceId,
    });
    newOrder.save();
    
     return NextResponse.json({
      success: true,
      exactlyPaymentUrl: hostedUrl,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ping request failed", details: error.message },
      { status: 500 }
    );
  }
}
