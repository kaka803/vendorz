import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDb } from "@/app/lib/db";
import nodemailer from "nodemailer";

export async function POST(req) {
  await connectDb();
  try {
    // 📦 Request body parse
    const { products, subtotal, total, UserEmail, shippingAddress } = await req.json();

    // 🏷️ Shipping fields destructure
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      address,
      postalCode,
      note,
    } = shippingAddress;

    const amountString = total?.toFixed(2);
    const referenceId = "order_" + Date.now(); // Unique order ID

    // 💳 Create payment with Exactly
    const response = await fetch("https://api.exactly.com/api/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Authorization: `Api-Key ${process.env.EXACTLY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "charge",
          attributes: {
            projectId: process.env.NEXT_PUBLIC_EXACTLY_PROJECT_ID,
            paymentMethod: "card",
            amount: amountString,
            currency: "USD",
            referenceId,
          },
        },
      }),
    });

    const data = await response.json();
    const hostedUrl = data?.included?.[0]?.attributes?.url;

    // 📝 Save order in DB
    const newOrder = await Order.create({
      shippingAddress: {
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        address,
        postalCode,
        note,
      },
      products,
      subtotal,
      total,
      exactlyPaymentUrl: hostedUrl,
      paymentStatus: "pending",
      UserEmail,
      referenceId,
    });

    // 📧 Setup mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 📩 Mail to Admin
    const adminMailOptions = {
      from: `"3dvendorz Orders" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🛒 New Order Received - ${referenceId}`,
      html: `
        <h2>New Order Alert</h2>
        <p><strong>Order ID:</strong> ${newOrder._id}</p>
        <p><strong>Customer Email:</strong> ${UserEmail ? UserEmail : email}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Shipping Address:</strong></p>
        <pre>${JSON.stringify(shippingAddress, null, 2)}</pre>
        <p><strong>Products:</strong></p>
        <pre>${JSON.stringify(products, null, 2)}</pre>
        <p><a href="${hostedUrl}" target="_blank">View Payment Page</a></p>
      `,
    };

    

    await transporter.sendMail(adminMailOptions);

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
