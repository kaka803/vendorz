'use client'
import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import LatestProducts from "./components/latestpro";
import CategorySection from "./components/categories";
import VendorSection from "./components/vendorsection";
import MostSellingSection from "./components/mostsellingproducts";
import TestimonialSection from "./components/testimonial";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
    <div className="relative">
    <Navbar/>
    <div className="main hero-section relative w-full h-screen overflow-hidden">
  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src="/background.mp4" type="video/mp4" />
  </video>

  {/* Black Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* Content */}
  <div className="relative flex flex-col items-center justify-center h-full text-white text-center z-10">
    <Hero/>
  </div>
</div>

<div className="section flex flex-col md:flex-row justify-between   w-full min-h-[100px] my-20 max-md:my-15 main-container relative">
  {/* Heading */}
  <h1 className="text-2xl sm:text-3xl md:text-4xl  font-sans text-[#365a41] font-normal leading-snug md:leading-tight text-center md:text-left">
    Need Unique 3D Designs? From <br className="hidden sm:block" /> 
    Vehicles to Virtual Beasts, We <br className="hidden sm:block" /> 
    Build Models That Inspire.
  </h1>

  {/* Button */}
  <div className="flex justify-center md:justify-end mt-6 md:mt-0 relative md:absolute md:bottom-0 md:right-0">
    <button className="bg-[#365a41] hover:bg-white text-white hover:text-black transition px-6 py-3 rounded-lg font-sans text-sm sm:text-base md:text-lg uppercase">
      send inquiry
    </button>
  </div>
</div>



<section className=" w-full main-container">
<LatestProducts/>
</section>
<section className="main-container">
  <CategorySection/>
</section>

<section>
  <VendorSection/>
</section>
<section className="w-full main-container">
  <MostSellingSection/>
</section>
<section className="w-full main-container">
  <TestimonialSection/>
</section>
    </div>
    <Footer/>
    </>
  );
}
