"use client";
import React, { useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ShoppingCart } from "lucide-react";
import { useProducts } from "../context/productcontext";
import Link from "next/link";
import { useCart } from "../context/cartcontext";
import Price from "./Price";

// Skeleton Card
const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl my-2 white-border shadow-md max-md:w-full w-[260px] min-h-[370px] mx-auto flex flex-col bg-white/5">
    {/* Image skeleton */}
    <div className="w-full h-44 bg-gray-700/40 rounded-t-2xl"></div>

    {/* Content skeleton */}
    <div className="flex flex-col flex-grow px-4 pb-4 pt-3 gap-3">
      <div className="h-4 w-3/4 bg-gray-700/40 rounded"></div>
      <div className="h-5 w-1/2 bg-gray-700/40 rounded"></div>

      <div className="flex gap-2 mt-2">
        <div className="h-6 w-12 bg-gray-700/40 rounded"></div>
        <div className="h-6 w-12 bg-gray-700/40 rounded"></div>
      </div>

      <div className="flex gap-2 mt-3">
        <div className="h-8 w-20 bg-gray-700/40 rounded"></div>
        <div className="h-8 w-20 bg-gray-700/40 rounded"></div>
      </div>
    </div>
  </div>
);

const LatestProducts = () => {
  const { products, loading, allproducts } = useProducts();
  const { addToCart } = useCart();

  // ✅ Random products generate (10 items from allproducts if available)
  const randomProducts = useMemo(() => {
    const source =
      allproducts && allproducts.length > 0 ? allproducts : products;
    if (!source || source.length === 0) return [];
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [products, allproducts]);

  // buttons ke ref
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="min-h-[100%] w-full px-5 flex flex-col items-center justify-center pt-20 relative">
      <div className="w-full max-w-[1280px] relative">
        <h1 className="text-start max-md:text-2xl text-3xl md:ml-4 mb-6 orbitron text-white">
          Editor’s Picks
        </h1>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {/* Loading skeletons */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletonCard />
              </SwiperSlide>
            ))}

          {/* Actual products */}
          {!loading &&
            randomProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="group overflow-hidden rounded-2xl my-2 white-border shadow-md hover:shadow-lg transition-all duration-300 max-md:w-full w-[260px] h-92 mx-auto flex flex-col">
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
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestProducts;
