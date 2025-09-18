// app/components/SearchOverlay.jsx
"use client";
import { useState, useEffect } from "react";
import { X, Search, ShoppingCart } from "lucide-react";
import { useProducts } from "../context/productcontext";
import { useCart } from "../context/cartcontext";
import Link from "next/link";

export default function SearchOverlay({ isOpen, onClose }) {
  const { allproducts } = useProducts();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const addToCart = useCart()

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
    } else {
      setFiltered(
        allproducts.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, allproducts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 font-sans bg-[#365a41] animate-slideDown flex flex-col">
  {/* Header with Close */}
  <div className="flex items-center justify-between p-4 border-b border-white/20">
    <div className="flex items-center w-full max-w-2xl mx-auto bg-white rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-yellow-400">
      <Search className="text-gray-500 mr-2" size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        autoFocus
        className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 text-lg"
      />
    </div>
    <button
      onClick={onClose}
      className="ml-4 text-white hover:text-yellow-300 transition"
    >
      <X size={28} />
    </button>
  </div>

  {/* Results Section */}
  <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
    {query.trim() === "" ? (
      <p className="text-gray-200 text-center mt-20 text-lg">
        Start typing to search products...
      </p>
    ) : filtered.length > 0 ? (
      <ul className="flex flex-col gap-4">
        {filtered.map((product) => (
         <Link key={product._id} href={`/product/${product._id}`}> <li
            
            className="flex items-center justify-between bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl p-3 hover:shadow-lg hover:scale-[1.02] transition cursor-pointer"
          >
            {/* Left: Image + Info */}
            <div className="flex items-center gap-4 mb-2">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg shadow"
              />
              <div>
                
                <p className="text-sm text-gray-600 line-clamp-1">
                  {product.title}
                </p>
                <p className="text-[#365a41] font-bold mt-1">
                  ${product.price_numeric}
                </p>
              </div>
            </div>

           
            <button onClick={()=> addToCart(product)} className="flex items-center gap-2 bg-[#365a41] text-white px-3 py-2 rounded-lg hover:bg-[#2d4a35] transition">
              <ShoppingCart size={16} />
              <span className="text-sm">Add</span>
            </button>
          </li></Link>
        ))}
      </ul>
    ) : (
      <p className="text-gray-200 text-center mt-20 text-lg">
  No products found for &quot;{query}&quot;
</p>

    )}
  </div>
</div>

  );
}
