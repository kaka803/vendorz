"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "../context/productcontext";
import { useCart } from "../context/cartcontext";
import Link from "next/link";
import { HashLoader } from "react-spinners";
import Price from "./Price";

const LatestProducts = () => {
  const { products,loading } = useProducts();
  const { addToCart } = useCart();
  const productslatest = products.slice(0, 12);

  // buttons ke ref
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="min-h-[400px] px-5 w-full flex flex-col items-center justify-center bottom-top pt-20 relative">
  <div className="w-full max-w-[1280px] relative">
    <h1 className="text-start max-md:text-2xl text-3xl md:ml-4 mb-6 orbitron text-[white]">
      Latest Products
    </h1>

    <div
      className={`${
        loading
          ? "flex justify-center items-center w-full h-[200px]"
          : "block"
      }`}
    >
      {loading && <HashLoader size={40} color="#4F46E5" />}
    </div>

    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
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
      {productslatest.map((product) => (
        <SwiperSlide key={product.id}>
          
            <div
  key={product._id}
  className="group overflow-hidden rounded-2xl my-2 white-border shadow-md hover:shadow-lg transition-all duration-300 max-md:w-full w-[260px] h-[340px] mx-auto flex flex-col"
>
  {/* Badge */}
  <div className="px-3 py-1 exo bg-[#EDE9FE] text-[black] text-xs font-medium rounded-br-xl w-fit">
    New Arrival
  </div>

  {/* Product Image */}
  <div className="relative w-full h-40 flex items-center justify-center p-4">
    <img
      src={product.images[0]}
      alt={product.name}
      className="max-h-full max-w-full object-contain"
    />
  </div>

  {/* Card Content */}
  <div className="flex flex-col flex-grow px-4 pb-4 justify-between">
    <div>
      <h3 className="text-base exo font-semibold text-gray-900 truncate">
        {product.name}
      </h3>
      <p className="text-sm exo text-white mt-1 line-clamp-2">
        {product.title}
      </p>
    </div>

    <div>
      {/* Price */}
      <p className="text-lg exo font-bold text-[white] mt-2">
        <Price basePrice={product.price_numeric} />
      </p>

      {/* Buttons */}
      <div className="mt-3 flex gap-2 w-full">
        {/* Add to cart button */}
        <button
          onClick={() => addToCart(product)}
          className="flex-2 flex items-center justify-center gap-1 bg-gray-100 w-[60%] text-gray-600 text-sm font-medium px-3 py-3 rounded-lg hover:bg-gray-200 transition"
        >
          <ShoppingCart size={16} />
          Add
        </button>

        {/* Link styled like a button */}
        <Link
          href={`/product/${product._id}`}
          className="flex-1 bg-gradient-to-r from-[#4e47af] to-[#4C1D95] text-white text-sm font-semibold w-[40%] px-3 py-3 rounded-lg transition flex items-center justify-center"
        >
          Buy
        </Link>
      </div>
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
