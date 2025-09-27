"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/app/context/productcontext";
import { Check, X, ShoppingCart, ChevronRight } from "lucide-react"; // ✅ ChevronRight for breadcrumbs
import Navbar from "@/app/components/navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Footer from "@/app/components/footer";
import { useCart } from "@/app/context/cartcontext";
import CurrencySidebar from "@/app/components/CurrencySidebar";
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Price from "@/app/components/Price";

export default function ProductClient({ params }) {
  const { id } = params; // ✅ yahan `use(params)` hatao
  const { allproducts, loading } = useProducts(); // ✅ direct destructure
  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    if (allproducts && allproducts.length > 0) {
      const found = allproducts.find((p) => p._id == id);
      if (found) {
        setProduct(found);
        setSelected(found.images?.[0] || "");
      }
    } else {
      console.log("Products not loaded yet 👉", allproducts);
    }
  }, [allproducts, id]);

  if (loading) {
    return <div className="text-white">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        Product not found...
      </div>
    );
  }

  return (
    <>
    <CurrencySidebar />
      <Navbar />
      <div className="min-h-screen main-container mt-20 py-12 px-6 lg:px-20">
      <div className=" py-3 px-6 lg:px-10 ">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-white font-sans space-x-2">
          <Link href="/" className="hover:text-white/70 font-medium">
            Home
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <Link href="/shop" className="hover:text-white/70 font-medium">
            Shop
          </Link>
          
          <ChevronRight size={16} className="text-gray-400" />
          <span className="hover:text-white/70 truncate max-w-[200px]">
            {product.title}
          </span>
        </div>
      </div>
        <div className="max-w-7xl mx-auto  rounded-2xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
  {/* Left Section: Image Gallery */}
  <section className="lg:col-span-7 max-h-[500px] flex flex-col lg:flex-row gap-6">
    {/* Main Image */}
    <div className="relative flex-1 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50">
      {selected ? (
        <img
          src={selected}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-500 ease-in-out hover:scale-105"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No image
        </div>
      )}
    </div>

    {/* Thumbnails */}
    <div className="w-full lg:w-[120px] flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar">
      {(product.images || []).map((img, i) => (
        <button
          key={i}
          onClick={() => setSelected(img)}
          className={`relative flex-shrink-0 m-2 p-2 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 shadow-sm`}
        >
          <img
            src={img}
            alt={`thumb-${i}`}
            className="w-full h-full object-contain"
          />
        </button>
      ))}
    </div>
  </section>

  {/* Right Section: Product Details */}
  <aside className="lg:col-span-5 flex flex-col gap-6">
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold font-sans text-[white]">
        {product.title}
      </h1>
      <p className="text-sm text-gray-200 mt-1 font-sans">
        {product.category || "Uncategorized"}
      </p>
    </div>

    <div className="flex items-center gap-4">
      <div className="text-3xl font-bold font-sans text-[white]">
  <Price basePrice={product.price_numeric} />
</div>

    </div>

    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => addToCart(product)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg white-border text-white hover:bg-[#2d4a35] transition"
      >
        <ShoppingCart size={16} /> Add to Cart
      </button>
    </div>

    {/* Technical Specs */}
    <div className="mt-2">
  <h4 className="text-xl font-semibold font-sans mb-4 text-[white]  pb-2">
    Technical Details
  </h4>
  <div className=" rounded-xl shadow-sm ">
    <table className="w-full text-sm font-sans">
      <tbody>
        {[
          ["Format", (product.file_formats || []).join(", ")],
          ["Size", product.file_size || "—"],
          ["Render Engine", product.render_engine || "—"],
          ["Polygon Count", product.polygon_count ?? "—"],
          ["Vertices", product.vertices_count ?? "—"],
        ].map(([label, value], i) => (
          <tr
            key={label}
            className={`${
              i % 2 === 0 ? "white-border" : "white-border"
            } hover:white-border transition`}
          >
            <td className="px-4 py-3 font-medium text-white">{label}</td>
            <td className="px-4 py-3 text-right text-white">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  </aside>

  {/* Features Section (Textured, Low poly, etc.) */}
  <div className="lg:col-span-12 mt-6">
    <h4 className="text-xl font-semibold orbiton  mb-3 text-[white]  pb-2">
      Key Features
    </h4>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {[
        ["Textured", product.textured],
        ["Low poly", product.low_poly],
        ["Rigged", product.rigged],
        ["Materials", product.materials],
        ["Animated", product.animated],
      ].map(([label, val]) => (
        <div
          key={label}
          className="flex items-center justify-between white-border px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="text-sm font-sans text-white font-medium">{label}</div>
          <div>
            {val ? (
              <Check size={18} className="text-white" />
            ) : (
              <X size={18} className="text-white" />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Product Description */}
  <div className="lg:col-span-12 mt-10">
    <h4 className="text-2xl mb-4 font-semibold orbiton pb-2">
      Product Overview
    </h4>
    <div
      className="prose max-w-none p-5 rounded-lg white-border text-white leading-relaxed font-sans whitespace-pre-line shadow-sm"
      dangerouslySetInnerHTML={{ __html: product.description || "" }}
    />
  </div>
</div>
      </div>

      {/* Related Products */}
      <div className="main-container mx-7">
      <section className="min-h-[100%] w-full flex flex-col items-center justify-center mb-30 pt-20 relative">
        <div className="w-full max-w-[1280px] relative">
          <h1 className="text-start text-3xl ml-2 mb-5 font-sans  text-white">
            Related Products
          </h1>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {allproducts
              ?.filter(
                (p) =>
                  p.category === product.category && p._id !== product._id
              )
              .map((related) => (
                <SwiperSlide key={related._id}>
                    <div key={product._id} className="group overflow-hidden  rounded-2xl my-2 white-border shadow-md hover:shadow-lg transition-all duration-300 max-md:w-full w-[260px] h-85 mx-auto flex flex-col">
                         
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
                </SwiperSlide>
              ))}
          </Swiper>
          </div>
      </section>
        </div>
      <Footer/>
    </>
  );
}
