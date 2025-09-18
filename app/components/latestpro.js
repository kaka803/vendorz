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

const LatestProducts = () => {
  const { products,loading } = useProducts();
  const { addToCart } = useCart();
  const productslatest = products.slice(0, 12);

  // buttons ke ref
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="min-h-[400px]  w-full flex flex-col items-center justify-center bottom-top pt-20  relative">
      

      <div className="w-[100%] max-w-[1280px] relative ">
      <h1 className={`text-start text-3xl mb-5 font-sans uppercase `} >Latest Products</h1>
        <div className={`${loading ? 'flex justify-center items-center w-full h-[200px]' : 'block'}`}>
        {loading && <HashLoader size={40} color="#365a41" />}
        </div>
          
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop= {true}
          onInit={(swiper) => {
            // custom buttons attach karna
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
              <Link href={`/product/${product._id}`}>
              <div  className="group bg-white rounded-sm shadow-md overflow-hidden  transition hover:shadow-lg">
                {/* Product Image */}
                <div className="w-full h-60 overflow-hidden relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Add to Cart */}
                <div className="absolute bottom-[-60px] left-0 w-full flex justify-center transition-all duration-500 group-hover:bottom-0">
                   <button onClick={() => addToCart(product)} className="flex justify-center w-full items-center gap-2 bg-[#365a41] text-white px-6 py-2  shadow  transition">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-sans font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm font-sans text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-3 font-sans text-xl font-bold text-[#365a41]">
                    ${product.price_numeric}
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

export default LatestProducts;
