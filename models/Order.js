import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String },
    note: { type: String },
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
  UserEmail: { type: String },
  paymentStatus: { type: String, default: "pending" },
  exactlyPaymentUrl: { type: String }, // frontend ko bhejna hai
  referenceId: { type: String }, // frontend ko bhejna hai
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
