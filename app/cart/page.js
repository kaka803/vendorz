"use client";
import Navbar from "../components/navbar";
import { X } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/cartcontext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    total,
  } = useCart();

  return (
    <>
      <Navbar />
      <div className="main-container mt-30 py-10">
        {/* Table Header */}
        <div className="border rounded-md overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-50 text-sm font-semibold font-sans text-gray-700 p-4">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>

          {/* Cart Items */}
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 font-sans items-center border-t p-4"
              >
                {/* Product info */}
                <div className="flex md:flex-row flex-col items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <span className="font-medium text-sm">{item.title}</span>
                </div>

                {/* Price */}
                <div>${item.price}</div>

                {/* Quantity */}
                <div className="flex md:flex-row flex-col items-center border rounded px-2 py-1 w-fit">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 grid items-center"
                  >
                    -
                  </button>
                  <span className="px-3 w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 grid items-center"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="flex items-center gap-2">
                  <span>
                    ${new Intl.NumberFormat("en-US").format(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-green-950 hover:text-green-950 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Cart Bottom Section */}
        {cart.length > 0 && (
          <div className="flex flex-col font-sans lg:flex-row justify-between mt-10 gap-6">
            
            

            {/* Cart Total */}
            <div className="border rounded-md p-6 w-full max-w-sm">
              <h2 className="text-md font-semibold mb-4">Cart Total</h2>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>${new Intl.NumberFormat("en-US").format(subtotal)}</span>
              </div>
              
              <div className="border-t my-2"></div>
              <div className="flex justify-between text-sm font-medium mb-4">
                <span>Total</span>
                <span>${new Intl.NumberFormat("en-US").format(total)}</span>
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
    </>
  );
}
