"use client";
import Navbar from "../components/navbar";
import { X } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/cartcontext";
import Footer from "../components/footer";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, total } = useCart();

  return (
    <>
      <Navbar />
      <div className="main-container mt-30 py-10">
        {/* Cart Container */}
        <div className="border rounded-md overflow-hidden">
          {/* Table Header (Desktop only) */}
          <div className="hidden md:grid grid-cols-4 bg-gray-50 text-sm font-semibold font-sans text-gray-700 p-4">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div className="text-right">Subtotal</div>
          </div>

          {/* Cart Items */}
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:grid md:grid-cols-4 font-sans items-start md:items-center border-t p-4 gap-4"
              >
                {/* Product info */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                  <span className="font-medium text-sm truncate max-w-[140px]">
                    {item.title.split(" ").slice(0, 2).join(" ")}
                    {item.title.split(" ").length > 2 && " ..."}
                  </span>
                </div>

                {/* Price */}
                <div className="text-sm w-full md:w-auto">
                  <span className="md:hidden font-semibold">Price: </span>$
                  {item.price.toFixed(2)}
                </div>

                {/* Quantity */}
                <div className="flex items-center border rounded px-2 py-1 w-fit">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2"
                  >
                    -
                  </button>
                  <span className="px-3 w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                  <span className="text-sm">
                    <span className="md:hidden font-semibold">Subtotal: </span>$
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                    }).format(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-green-950 hover:text-green-950 transition-all ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 font-sans text-gray-500">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Cart Bottom Section */}
        {cart.length > 0 && (
          <div className="flex flex-col font-sans lg:flex-row justify-between mt-10 gap-6">
            {/* Cart Total */}
            <div className="border rounded-md p-6 w-full max-w-sm ml-auto">
              <h2 className="text-md font-semibold mb-4">Cart Total</h2>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>
                  $
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                  }).format(subtotal)}
                </span>
              </div>

              <div className="border-t my-2"></div>
              <div className="flex justify-between text-sm font-medium mb-4">
                <span>Total</span>
                <span>
                  $
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                  }).format(total)}
                </span>
              </div>
              <Link href="/checkout">
                <button className="bg-[#365a41] hover:bg-[#427953] w-full text-white py-2 rounded text-sm">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}
