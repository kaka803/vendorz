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
import Link from "next/link";
import CurrencySidebar from "./components/CurrencySidebar";
import FeaturedProducts from "./components/featured";

export default function Home() {
  return (
    <>
    <CurrencySidebar />
    <div className="relative bg-black">
    <Navbar/>
   <Hero/>

<div className="section flex flex-col md:flex-row justify-between items-center w-full min-h-[120px] my-20 main-container relative white-border rounded-2xl  px-6 py-10 md:px-10 md:py-14">
  {/* Heading */}
  <h1 className="text-2xl orbitron sm:text-3xl text-white  font-semibold 
    
    leading-snug md:leading-tight 
    text-center md:text-left max-w-2xl">
    Need Unique 3D Designs? From <br className="hidden sm:block" /> 
    Vehicles to Virtual Beasts, We <br className="hidden sm:block" /> 
    Build Models That Inspire.
  </h1>

  {/* Button */}
  <Link href={'/contact'}>
  <button className="px-8 py-3 rounded-xl font-semibold text-base sm:text-lg font-sans 
    white-border
    text-white shadow-lg 
    hover:shadow-[0_6px_15px_rgba(109,40,217,0.6)] 
    hover:scale-105 
    active:translate-y-[2px] active:shadow-none
    transition-all duration-300">
    ✉️ Send Inquiry
  </button>
</Link>

</div>




<section className=" w-full main-container">
<LatestProducts/>
</section>
<section className="main-container">
  <CategorySection/>
</section>

<section className="w-full main-container">
  <FeaturedProducts/>
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
