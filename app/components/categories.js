"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useProducts } from "../context/productcontext";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

const CategorySection = () => {
  const { allproducts } = useProducts();

  // Extract unique categories
  const categories = useMemo(() => {
    const allCategories = allproducts.map((p) => p.category);
    return [...new Set(allCategories)];
  }, [allproducts]);

  // Optional: Different background colors for each category
  const bgColorMap = {
    tree: "bg-green-200",
    sports: "bg-red-200",
    car: "bg-blue-200",
    vegetable: "bg-emerald-200",
    jewlery: "bg-yellow-200",
    fruit: "bg-pink-200",
    bathroom: "bg-indigo-200",
    stool: "bg-purple-200",
    clothing: "bg-orange-200",
    buildings: "bg-slate-200",
  };

  return (
    <section className="w-full py-16">
      <div className="w-[95%] max-w-[1280px] mx-auto">
        <h1 className="text-start text-3xl mb-8 font-sans uppercase text-gray-800">
          Categories
        </h1>

        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop= {true}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Link href={'/shop'}>
              <div
                className={`flex items-center justify-center rounded-lg text-white p-6 cursor-pointer transition-transform transform hover:scale-105 ${
                  "bg-[#365a41]"
                }`}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white font-sans">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <p className="text-xs text-white mt-1 font-sans">
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
