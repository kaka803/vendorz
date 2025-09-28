"use client";
import Navbar from "../components/navbar";
import { X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/cartcontext";
import Footer from "../components/footer";
import { useCurrency } from "../context/CurrencyContext";
import { formatCurrency } from "@/lib/formatcurrency";
import CurrencySidebar from "../components/CurrencySidebar";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, total } = useCart();
  const { currency, rate } = useCurrency();

  return (
    <>
      <CurrencySidebar />
      <Navbar />
      <div className="main-container mt-30 py-10">
        <div className="rounded-2xl shadow-md border border-white/10 bg-white/5">
          {/* Table Header (Desktop only) */}
          <div className="hidden md:grid grid-cols-4 border-b border-white/10 text-sm font-semibold font-sans text-white p-4">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div className="text-right">Subtotal</div>
          </div>

          {/* Cart Items */}
          {cart.length > 0 ? (
            cart.map((item) => {
              const convertedPrice = item.price * rate;
              const convertedSubtotal = item.price * item.quantity * rate;

              return (
                <div
                  key={item.id}
                  className="flex flex-col md:grid md:grid-cols-4 font-sans items-start md:items-center border-t border-white/10 p-4 gap-4 hover:bg-white/5 transition"
                >
                  {/* Product info */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="rounded-lg shadow-md"
                    />
                    <span className="font-medium text-sm truncate max-w-[140px] text-white">
                      {item.title.split(" ").slice(0, 2).join(" ")}
                      {item.title.split(" ").length > 2 && " ..."}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-sm w-full md:w-auto text-white">
                    <span className="md:hidden font-semibold">Price: </span>
                    {formatCurrency(convertedPrice, currency)}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center bg-white/10 rounded-lg px-2 py-1 w-fit text-white">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 hover:text-gray-200"
                    >
                      -
                    </button>
                    <span className="px-3 w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 hover:text-gray-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between md:justify-end w-full md:w-auto text-white">
                    <span className="text-sm">
                      <span className="md:hidden font-semibold">Subtotal: </span>
                      {formatCurrency(convertedSubtotal, currency)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-300 hover:text-red-400 transition-all ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 font-sans text-gray-400">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Cart Bottom Section */}
        {cart.length > 0 && (
          <div className="flex flex-col font-sans lg:flex-row justify-between mt-10 gap-6">
            {/* Cart Total */}
            <div className="rounded-2xl p-6 w-full max-w-sm ml-auto shadow-md border border-white/10 bg-white/5 text-white">
              <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal * rate, currency)}</span>
              </div>

              <div className="border-t border-white/20 my-2"></div>
              <div className="flex justify-between text-sm font-medium mb-4">
                <span>Total</span>
                <span>{formatCurrency(total * rate, currency)}</span>
              </div>
              <Link href="/checkout">
                <button className="bg-gradient-to-r from-[#4e47af] to-[#351466] hover:brightness-110 w-full text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition">
                  <ShoppingCart size={16} />
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
