"use client";
import { useState } from "react";
import Navbar from "../components/navbar";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { formatCurrency } from "@/lib/formatcurrency";
import Footer from "../components/footer";
import { useCurrency } from "../context/CurrencyContext";
import CurrencySidebar from "../components/CurrencySidebar";

export default function CheckoutPage() {
  const { cart, subtotal, total } = useCart();
  const [payloading, setpayloading] = useState(false);
  const { user } = useAuth();
  const { currency, rate } = useCurrency();

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
    const promise = (async () => {
      setpayloading(true);
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress: form,
          products: cart,
          subtotal: subtotal * rate,   // ✅ converted amount
          total: total * rate,         // ✅ converted amount
          currency,                    // ✅ send selected currency
          UserEmail,
        }),
      });

      const data = await response.json();
      setpayloading(false);

      if (!data.success) throw new Error(data.message);

      if (data.exactlyPaymentUrl) {
        window.location.href = data.exactlyPaymentUrl; // ✅ Redirect
      } else {
        throw new Error("Payment URL not received");
      }
    })();

    // 🔔 Loading / Success / Error Toast
    toast.promise(promise, {
      loading: "Processing your order...",
      success: "Redirecting to payment ✅",
      error: (err) => `Payment failed ❌ ${err.message}`,
    });
  };


  return (
    <>
  <CurrencySidebar />
  <Navbar />
  <div className="max-w-[90%] mx-auto mt-32 font-sans mb-20">
    <h2 className="text-2xl font-semibold mb-6 text-white orbitron">Checkout</h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left Side - Billing Info */}
      <div className="space-y-4 bg-white/5 backdrop-blur-md shadow-md border border-white/10 p-6 rounded-2xl">
        <h3 className="text-lg font-medium mb-2 text-white">Contact Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border border-white/20 bg-transparent text-white placeholder-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name*"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border border-white/20 bg-transparent text-white placeholder-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address*"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-white/20 bg-transparent text-white placeholder-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-white/20 bg-transparent text-white placeholder-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <h3 className="text-lg font-medium mt-6 mb-2 text-white">Billing Address</h3>
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border border-white/20 bg-transparent text-white placeholder-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        >
          <option value="" className="text-gray-800">Select Country/Region</option>
          <option value="United States" className="text-gray-800">United States</option>
          <option value="United Kingdom" className="text-gray-800">United Kingdom</option>
          <option value="Pakistan" className="text-gray-800">Pakistan</option>
          <option value="India" className="text-gray-800">India</option>
          <option value="Latvia" className="text-gray-800">Latvia</option>
          <option value="Germany" className="text-gray-800">Germany</option>
        </select>

        <input
          type="text"
          name="address"
          placeholder="Address*"
          value={form.address}
          onChange={handleChange}
          className="w-full border border-white/20 bg-transparent text-white placeholder-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City*"
          value={form.city}
          onChange={handleChange}
          className="w-full border border-white/20 bg-transparent text-white placeholder-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code*"
          value={form.postalCode}
          onChange={handleChange}
          className="w-full border border-white/20 bg-transparent text-white placeholder-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <textarea
          name="note"
          placeholder="Add a note to your order (optional)"
          value={form.note}
          onChange={handleChange}
          className="w-full border border-white/20 bg-transparent text-white placeholder-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          rows={4}
        />

        <button
          onClick={handlePayNow}
          disabled={payloading}
          className="bg-gradient-to-r from-[#4e47af] to-[#351466] hover:brightness-110 h-12 flex justify-center items-center text-white w-full py-3 rounded-xl mt-4 font-semibold shadow-md transition"
        >
          {payloading ? <HashLoader size={20} color="white" /> : "Place Order"}
        </button>
      </div>

      {/* Right Side - Order Summary */}
      <div>
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md shadow-md">
          <div className="grid grid-cols-4 bg-white/10 text-sm font-semibold text-white p-4">
            <div>Product</div>
            <div>Price</div>
            <div>Qty</div>
            <div>Subtotal</div>
          </div>

          {cart.map((item) => {
            const convertedPrice = item.price * rate;
            const convertedSubtotal = item.price * item.quantity * rate;

            return (
              <div
                key={item.id}
                className="grid grid-cols-4 items-center border-t border-white/10 p-4 text-sm text-white"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-lg shadow-md"
                  />
                  <span className="font-medium truncate max-w-[120px]">
                    {item.title.split(" ").slice(0, 2).join(" ")}
                    {item.title.split(" ").length > 2 && " ..."}
                  </span>
                </div>
                <div>{formatCurrency(convertedPrice, currency)}</div>
                <div>{item.quantity}</div>
                <div>{formatCurrency(convertedSubtotal, currency)}</div>
              </div>
            );
          })}

          <div className="border-t border-white/10 mt-4 p-4 text-white">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal * rate, currency)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(total * rate, currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</>

  );
}
