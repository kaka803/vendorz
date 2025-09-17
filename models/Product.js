// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  price_numeric: { type: Number, required: true },
  original_price: { type: Number, default: null },
  discount: { type: Number, default: null },
  currency: { type: String, default: "USD" },
  vendor: { type: String },
  images: { type: [String], default: [] },
  file_formats: { type: [String], default: [] },
  category: { type: String },
  product_id: { type: String },
  is_paid: { type: Boolean, default: false },
  polygon_count: { type: Number, default: 0 },
  vertices_count: { type: Number, default: 0 },
  file_size: { type: String },
  render_engine: { type: String },
  animated: { type: Boolean, default: false },
  textured: { type: Boolean, default: false },
  rigged: { type: Boolean, default: false },
  materials: { type: Boolean, default: false },
  low_poly: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
