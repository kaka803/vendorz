"use client";
import React, { useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useProducts } from "../context/productcontext";
import { useCart } from "../context/cartcontext";
import Price from "./Price";

const FeaturedProducts = () => {
  const { products, allproducts } = useProducts();
  const { addToCart } = useCart();

  // ✅ 15 random products
  const randomProducts = useMemo(() => {
    const source = allproducts && allproducts.length > 0 ? allproducts : products;
    if (!source || source.length === 0) return [];
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 16);
  }, [products, allproducts]);

  return (
    <section className="w-full py-7 pb-20 ">
      <div className="w-[95%] max-w-[1280px] mx-auto">
        {/* Heading */}
        <h1 className="text-start text-3xl  pb-16 orbitron text-[white]">
          Handpicked For You
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {randomProducts.map((product) => (
           <div key={product._id} className="group overflow-hidden  rounded-2xl my-2 white-border shadow-md hover:shadow-lg transition-all duration-300 w-[260px] h-85 mx-auto flex flex-col">
                         
                         {/* Badge */}
                         <div className="px-3 py-1 exo bg-[#EDE9FE] text-[black] text-xs font-medium rounded-br-xl w-fit">
                           New Arrival
                         </div>
           
                         {/* Product Image */}
                         <div className="relative w-full h-44 flex items-center justify-center p-4">
                           <img
                             src={product.images[0]}
                             alt={product.name}
                             className="max-h-full max-w-full object-contain"
                           />
                         </div>
           
                         {/* Card Content */}
                         <div className="flex flex-col flex-grow px-4 pb-4">
                           <h3 className="text-base exo font-semibold text-gray-900 truncate">
                             {product.name}
                           </h3>
                           <p className="text-sm exo text-white mt-1 line-clamp-2">
                             {product.title}
                           </p>
           
                           {/* Price */}
                           <p className="text-lg exo font-bold text-[white] mt-2">
                             <Price basePrice={product.price_numeric} />
                           </p>
           
                           {/* Buttons */}
                           <div className="mt-3 flex gap-2">
             {/* Add to cart button */}
             <button
               onClick={() => addToCart(product)}
               className="flex-1 flex items-center justify-center gap-1 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-200 transition"
             >
               <ShoppingCart size={16} />
               Add
             </button>
           
             {/* Link styled like a button */}
             <Link
               href={`/product/${product._id}`}
               className="flex-1 white-border text-white text-sm font-semibold px-3 py-2 rounded-lg  transition flex items-center justify-center"
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
