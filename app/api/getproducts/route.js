import { connectDb } from "@/app/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        await connectDb();
        const products = await Product.find({});
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
};
