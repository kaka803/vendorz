"use client";
import React, { useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useProducts } from "../context/productcontext";
import { useCart } from "../context/cartcontext";
import Price from "./Price";

// ✅ Skeleton Card Component
const ProductSkeleton = () => {
  return (
    <div className="group overflow-hidden rounded-2xl my-2 white-border shadow-md max-md:w-full w-[260px] h-92 mx-auto flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full h-44 flex items-center justify-center p-4 bg-gray-800/40 rounded-lg" />

      {/* Content Skeleton */}
      <div className="flex flex-col flex-grow px-4 pb-4 gap-2 mt-2">
        <div className="h-4 w-3/4 bg-gray-700 rounded" />
        <div className="h-6 w-1/2 bg-gray-600 rounded mt-2" />

        {/* File formats */}
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-10 bg-gray-700 rounded" />
          <div className="h-5 w-10 bg-gray-700 rounded" />
        </div>

        {/* Buttons */}
        <div className="mt-3 flex gap-2">
          <div className="h-8 w-20 bg-gray-700 rounded" />
          <div className="h-8 w-16 bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const { products, allproducts, allproductloadidng, loading } = useProducts();
  const { addToCart } = useCart();

  // ✅ 15 random products
  const randomProducts = useMemo(() => {
    const source = allproducts && allproducts.length > 0 ? allproducts : products;
    if (!source || source.length === 0) return [];
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 16);
  }, [products, allproducts]);

  return (
    <section className="w-full px-5 py-7 mt-10 pb-20">
      <div className="w-[95%] max-w-[1280px] mx-auto">
        {/* Heading */}
        <h1 className="text-start max-md:text-2xl text-3xl max-md:pb-8 pb-16 orbitron text-[white]">
          Handpicked <br className="block md:hidden" /> For You
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(loading || allproductloadidng)
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : randomProducts.map((product) => (
                <div
                  key={product._id}
                  className="group overflow-hidden rounded-2xl my-2 white-border shadow-md hover:shadow-lg transition-all duration-300 max-md:w-full w-[260px] h-92 mx-auto flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-44 flex items-center justify-center p-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-grow px-4 pb-4">
                    <h3 className="text-base exo font-semibold text-white truncate">
                      {product.title}
                    </h3>

                    {/* Price */}
                    <p className="text-lg exo font-bold text-white mt-2">
                      <Price basePrice={product.price_numeric} />
                    </p>

                    {/* File Formats */}
                    {product.file_formats?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.file_formats.slice(0, 4).map((ext, i) => (
                          <span
                            key={i}
                            className="text-xs exo px-2 py-1 rounded-md bg-gradient-to-r from-[#4e47af] to-[#4C1D95] text-white"
                          >
                            {ext}
                          </span>
                        ))}
                        {product.file_formats.length > 4 && (
                          <span className="text-xs exo px-2 py-1 rounded-md bg-gray-200 text-gray-600">
                            +{product.file_formats.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="mt-3 flex gap-2">
                      {/* Add to cart */}
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1/2 flex items-center justify-center gap-1 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                      >
                        <ShoppingCart size={16} />
                        Add
                      </button>

                      {/* Buy */}
                      <Link
                        href={`/product/${product._id}`}
                        className="flex-1 bg-gradient-to-r from-[#4e47af] to-[#4C1D95] text-white text-sm font-semibold px-3 py-2 rounded-lg transition flex items-center justify-center"
                      >
                        Buy
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-10">
          <Link
            href="/shop"
            className="px-8 py-3 rounded-xl font-semibold text-base sm:text-lg font-sans 
            white-border
            text-white shadow-lg hover:shadow-xl 
            transition-all duration-300"
          >
            Show More →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
