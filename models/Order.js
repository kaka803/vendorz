import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  shippingAddress: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String },
  },
  products: [
    {
      id: { type: String, required: true },
      name: String,
      image: String,
      quantity: Number,
      selectedColor: String,
      selectedSize: String,
      price: Number,
    },
  ],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentStatus: { type: String, default: "pending" },
  exactlyPaymentUrl: { type: String }, // ye frontend ko bhejna hai
  referenceId: { type: String }, // ye frontend ko bhejna hai
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
