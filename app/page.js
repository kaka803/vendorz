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
