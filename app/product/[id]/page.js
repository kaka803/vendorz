"use client";
import React, { use, useEffect, useState } from "react";
import { useProducts } from "@/app/context/productcontext";
import { Check, X, ShoppingCart, Share2 } from "lucide-react";
import Navbar from "@/app/components/navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Footer from "@/app/components/footer";
import { useCart } from "@/app/context/cartcontext";


export default function ProductClient({ params }) {
  const { id } = use(params);

  const products = useProducts();
  const [product, setProduct] = useState(null);
const [selected, setSelected] = useState("");
const { addToCart } = useCart();
  
useEffect(() => {
  if (products?.products && products.products.length > 0) {
    const found = products.products.find((p) => p._id == id);
    setProduct(found);
    setSelected(found.images?.[0] || "");
  } else {
    console.log("Products not loaded yet 👉", products);
  }

  console.log("id from params 👉", id);
}, [products, id]);

  if (!product) {
    return <div className="text-white">Loading product...</div>;
  }




  // 🔹 Guard against null product
  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen main-container mt-20 py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section: Image Gallery */}
        <section className="lg:col-span-7 max-h-[424px] flex flex-col lg:flex-row gap-6">
          {/* Main Image */}
          <div className="relative flex-1 rounded-2xl overflow-hidden  flex items-center justify-center ">
            {selected ? (
              <img
                src={selected}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No image
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="w-full lg:w-[120px] flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
            {(product.images || []).map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(img)}
                className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-sm hover:scale-105 ${
                  selected === img
                    ? "border-[#365a41] ring-2 ring-[#365a41]"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Right Section: Product Details */}
        <aside className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold font-sans text-[#365a41]">{product.title}</h1>
            <p className="text-sm text-gray-500 mt-1 font-sans">
              by <span className="font-medium text-gray-700">{product.vendor || "Unknown"}</span> •{" "}
              {product.category || "Uncategorized"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold font-sans text-[#365a41]">{product.price}</div>
            <div className="text-sm font-sans text-gray-500">
              {product.is_paid ? "Paid" : "Free"}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => addToCart(product)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#365a41] text-white ">
              <ShoppingCart size={16} /> Add to Cart
            </button>

            
          </div>

          <div className="prose max-w-none text-gray-700">
            <h3 className="mt-2">Description</h3>
            <div className="wrap-anywhere font-sans" dangerouslySetInnerHTML={{ __html: product.description || "" }} />
          </div>

          {/* Technical Specs */}
          <div className="mt-2">
            <h4 className="text-lg font-medium font-sans">Technical details</h4>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr className="border-t">
                    <td className="py-3 font-medium font-sans">Format</td>
                    <td className="py-3 text-right font-sans">{(product.file_formats || []).join(", ")}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 font-medium font-sans">Size</td>
                    <td className="py-3 text-right font-sans">{product.file_size || "—"}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 font-medium font-sans">Render Engine</td>
                    <td className="py-3 text-right font-sans">{product.render_engine || "—"}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 font-medium font-sans">Polygon Count</td>
                    <td className="py-3 text-right font-sans">{product.polygon_count ?? "—"}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 font-medium font-sans">Vertices</td>
                    <td className="py-3 text-right font-sans">{product.vertices_count ?? "—"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                ["Textured", product.textured],
                ["Low poly", product.low_poly],
                ["Rigged", product.rigged],
                ["Materials", product.materials],
                ["Animated", product.animated],
                ["Paid", product.is_paid],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex items-center justify-between bg-[#365a41] p-3 rounded-md border"
                >
                  <div className="text-sm font-sans text-white">{label}</div>
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
        </aside>
      </div>
    </div>
    <section className="min-h-[100%] w-full flex flex-col items-center justify-center mb-30 pt-20 relative">
  <div className="w-full max-w-[1280px] relative">
    <h1 className="text-start text-3xl mb-5 font-sans uppercase text-[#365a41]">
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
      {products.products
        ?.filter(
          (p) => p.category === product.category 
        )
        .map((related) => (
          <SwiperSlide key={related.id}>
            <Link href={`/product/${related.id}`}>
              <div className="group bg-white rounded-sm overflow-hidden transition">
                {/* Product Image */}
                <div className="w-full h-60 overflow-hidden relative">
                  <img
                    src={related.images[0]}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Add to Cart */}
                  <div className="absolute bottom-[-60px] left-0 w-full flex justify-center transition-all duration-500 group-hover:bottom-0">
                    <button className="flex justify-center w-full items-center gap-2 bg-[#365a41] text-white px-6 py-2 shadow transition">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-sans font-semibold text-gray-800 truncate">
                    {related.title}
                  </h3>
                  <p className="text-sm font-sans text-gray-500 mt-1 line-clamp-2">
                    {related.description}
                  </p>
                  <p className="mt-3 font-sans text-xl font-bold text-[#365a41]">
                    {related.price}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  </div>
</section>
<Footer/>
    </>
  );
}
