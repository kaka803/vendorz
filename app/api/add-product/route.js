import Product from "@/models/Product";
import { connectDb } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();

    // Convert comma-separated strings to arrays if needed
    const imagesArray = Array.isArray(body.images)
      ? body.images
      : body.images?.split(",").map((img) => img.trim()).filter(Boolean) || [];
    const fileFormatsArray = Array.isArray(body.file_formats)
      ? body.file_formats
      : body.file_formats?.split(",").map((f) => f.trim()).filter(Boolean) || [];

    const product = new Product({
      ...body,
      price: body.price ? Number(body.price) : 0,
      original_price: body.original_price ? Number(body.original_price) : null,
      discount: body.discount ? Number(body.discount) : null,
      images: imagesArray,
      file_formats: fileFormatsArray,
    });

    await product.save();

    return NextResponse.json({ message: "Product added successfully", product }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
