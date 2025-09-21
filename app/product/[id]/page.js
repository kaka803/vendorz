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
import { formatCurrency } from "@/lib/formatcurrency";

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
      <Navbar />
      <div className="min-h-screen main-container mt-20 py-12 px-6 lg:px-20">
      <div className=" py-3 px-6 lg:px-10 ">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600 font-sans space-x-2">
          <Link href="/" className="hover:text-[#365a41] font-medium">
            Home
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <Link href="/shop" className="hover:text-[#365a41] font-medium">
            Shop
          </Link>
          
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-500 truncate max-w-[200px]">
            {product.title}
          </span>
        </div>
      </div>
        <div className="max-w-7xl mx-auto bg-white rounded-2xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
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
        className={`relative flex-shrink-0 m-2 p-2 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 
         
          hover:scale-105 shadow-sm`}
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
              <h1 className="text-2xl lg:text-3xl font-semibold font-sans text-[#365a41]">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-sans">
                
                {product.category || "Uncategorized"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold font-sans text-[#365a41]">
                ${formatCurrency(product.price_numeric)}
              </div>
              
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => addToCart(product)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#365a41] text-white "
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>

            <div className="prose max-w-none text-gray-700">
              <h4 className="text-2xl mb-3 font-medium font-sans">
                Overview
              </h4>

              <div
  className="wrap-anywhere font-sans whitespace-pre-line"
  dangerouslySetInnerHTML={{
    __html: product.description || "",
  }}
/>
            </div>  

            {/* Technical Specs */}
            <div className="mt-2">
              <h4 className="text-lg font-medium font-sans">
                Technical details
              </h4>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr className="border-t">
                      <td className="py-3 font-medium font-sans">Format</td>
                      <td className="py-3 text-right font-sans">
                        {(product.file_formats || []).join(", ")}
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3 font-medium font-sans">Size</td>
                      <td className="py-3 text-right font-sans">
                        {product.file_size || "—"}
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3 font-medium font-sans">
                        Render Engine
                      </td>
                      <td className="py-3 text-right font-sans">
                        {product.render_engine || "—"}
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3 font-medium font-sans">
                        Polygon Count
                      </td>
                      <td className="py-3 text-right font-sans">
                        {product.polygon_count ?? "—"}
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3 font-medium font-sans">Vertices</td>
                      <td className="py-3 text-right font-sans">
                        {product.vertices_count ?? "—"}
                      </td>
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

      {/* Related Products */}
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
            {allproducts
              ?.filter(
                (p) =>
                  p.category === product.category && p._id !== product._id
              )
              .map((related) => (
                <SwiperSlide key={related._id}>
                  <Link href={`/product/${related._id}`}>
                    <div className="group bg-white rounded-sm overflow-hidden transition">
                      {/* Product Image */}
                      <div className="w-full h-60 overflow-hidden relative">
                        <img
                          src={related.images?.[0] || "/placeholder.png"}
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
                        <h3 className="text-lg font-sans font-bold text-gray-800 truncate">
                          {related.title}
                        </h3>
                        
                        <p className="mt-3 font-sans text-xl font-bold text-[#365a41]">
                          ${formatCurrency(related.price_numeric)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
      <Footer />
    </>
  );
}
