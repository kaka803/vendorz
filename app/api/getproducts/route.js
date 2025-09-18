import { NextResponse } from "next/server";
import { connectDb } from "@/app/lib/db";
import Product from "@/models/Product";
export const GET = async (request) => {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;  // default 1
    const limit = parseInt(searchParams.get("limit")) || 20; // default 20
    const skip = (page - 1) * limit;

    const products = await Product.find({}).skip(skip).limit(limit);
    const total = await Product.countDocuments({});

    return NextResponse.json({ products, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
};
