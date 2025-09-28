"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useProducts } from "../context/productcontext";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

// Skeleton for category card
const CategorySkeleton = () => {
  return (
    <div className="flex my-4 mx-2 items-center justify-center rounded-xl p-6 cursor-pointer bg-gray-800/40 animate-pulse">
      <div className="text-center space-y-2">
        <div className="h-5 w-20 bg-gray-700 rounded mx-auto" />
        <div className="h-3 w-16 bg-gray-600 rounded mx-auto" />
      </div>
    </div>
  );
};

const CategorySection = () => {
  const { allproducts, allproductloadidng } = useProducts();

  // Extract unique categories
  const categories = useMemo(() => {
    const allCategories = allproducts.map((p) => p.category);
    return [...new Set(allCategories)];
  }, [allproducts]);

  return (
    <section className="w-full py-16 bottom-border">
      <div className="w-[95%] max-w-[1280px] mx-auto">
        <h1 className="text-start max-md:text-2xl text-3xl ml-4 mb-6 orbitron text-[white]">
          Categories
        </h1>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {allproductloadidng
            ? // Agar loading hai to skeleton slides show karo
              Array.from({ length: 6 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <CategorySkeleton />
                </SwiperSlide>
              ))
            : // Otherwise actual categories show karo
              categories.map((category, index) => (
                <SwiperSlide key={index}>
                  <Link href="/shop">
                    <div
                      className={`flex my-4 mx-2 items-center justify-center rounded-xl p-6 cursor-pointer 
                        bg-gradient-to-r from-[#4e47af] to-[#4C1D95]
                        transition-all duration-300 hover:scale-105`}
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-white font-sans tracking-wide">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h3>
                        <p className="text-xs text-gray-100 mt-1 font-sans">
                          {allproducts.filter((p) => p.category === category).length}{" "}
                          Products
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySection;
