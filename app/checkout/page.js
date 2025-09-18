"use client";
import { useState } from "react";
import Navbar from "../components/navbar";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const { cart, subtotal, total } = useCart();
  const [payloading, setpayloading] = useState(false);
  const { user } = useAuth();

  const UserEmail = user ? user.email : "";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: UserEmail || "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    note: "",
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
          UserEmail,
        }),
      });

      const data = await response.json();
      setpayloading(false);

      if (!data.success) throw new Error(data.message);

      if (data.exactlyPaymentUrl) {
        window.location.href = data.exactlyPaymentUrl; // Redirect to payment
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
      <div className="max-w-[90%] mx-auto mt-32 font-sans">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side - Billing Info */}
          <div className="space-y-4 bg-white shadow p-6 rounded-md">
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <h3 className="text-lg font-medium mt-6 mb-2">Billing Address</h3>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Country/Region</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="Latvia">Latvia</option>
              <option value="Germany">Germany</option>
            </select>

            <input
              type="text"
              name="address"
              placeholder="Address*"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City*"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code*"
              value={form.postalCode}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <textarea
              name="note"
              placeholder="Add a note to your order (optional)"
              value={form.note}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={4}
            />

            <button
              onClick={handlePayNow}
              disabled={payloading}
              className="bg-[#365a41] hover:bg-[#2d4934] text-white w-full py-3 rounded mt-4 font-semibold"
            >
              {payloading ? "Processing..." : "Place Order"}
            </button>
          </div>

          {/* Right Side - Order Summary */}
          <div>
            <div className="border rounded-md overflow-hidden bg-white shadow">
              <div className="grid grid-cols-4 bg-gray-50 text-sm font-semibold text-gray-700 p-4">
                <div>Product</div>
                <div>Price</div>
                <div>Qty</div>
                <div>Subtotal</div>
              </div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-center border-t p-4 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <div>${item.price}</div>
                  <div>{item.quantity}</div>
                  <div>
                    ${new Intl.NumberFormat("en-US").format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
              <div className="border-t mt-4 p-4">
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
