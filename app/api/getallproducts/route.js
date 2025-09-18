import Product from "@/models/Product";
import { connectDb } from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDb();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}