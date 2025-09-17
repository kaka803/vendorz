import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "app/lib/fixed_paid_products_96.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(rawData);

    const updatedProducts = products.map((item) => ({
      id: item.id || Date.now() + Math.floor(Math.random() * 1000),
      ...item,
    }));

    fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));

    return new Response(JSON.stringify({ success: true, products: updatedProducts }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
