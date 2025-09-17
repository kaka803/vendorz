// app/checkout/page.js
"use client";
import { useState } from "react";
import Navbar from "../components/navbar";
import { useCart } from "../context/cartcontext";

export default function CheckoutPage() {
  const { cart, subtotal, total } = useCart();
  const [payloading, setpayloading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handlePayNow = async () => {
  try {
    setpayloading(true);

    const response = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shippingAddress: form,
        products: cart,
        subtotal,
        total,
      }),
    });

    const data = await response.json();
    setpayloading(false);
    console.log(data);
    
    if (!data.success) throw new Error(data.message);

    if (data.exactlyPaymentUrl) {
      window.location.href = data.exactlyPaymentUrl; // Redirect to Exactly Hosted Checkout
    } else {
      alert("Payment URL not received");
    }
  } catch (error) {
    console.error(error);
    alert("Error processing payment: " + error.message);
  }
};



  return (
    <>
      <Navbar />
      <div className="max-w-[85%] mx-auto mt-30">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name*"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number*"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Order Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={4}
            />
            <button
              onClick={handlePayNow}
              className="bg-[#365a41] hover:bg-[#365a41] text-white w-full py-2 rounded"
            >
              {payloading ? "Processing..." : "Pay Now"}
            </button>
          </div>
          <div>
            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 text-sm font-semibold text-gray-700 p-4">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
              </div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-center border-t p-4 font-sans"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  <div>${item.price}</div>
                  <div>{item.quantity}</div>
                  <div>
                    ${new Intl.NumberFormat("en-US").format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
              <div className="border-t mt-4 p-4 font-sans">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${new Intl.NumberFormat("en-US").format(subtotal)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${new Intl.NumberFormat("en-US").format(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}