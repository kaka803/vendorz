"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".heading", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
        stagger: 0.25,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
  ref={heroRef}
  className="relative mt-8 min-h-screen flex flex-col justify-center items-center text-center px-6 py-30 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
>
  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/bg.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Heading */}
  <h1
    className="heading orbitron relative z-10 text-white drop-shadow-xl 
      text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase 
      tracking-tight leading-tight mx-auto"
  >
    Redefining Digital Spaces <br className="hidden sm:block" />
    with{" "}
    <span className="bg-gradient-to-r from-[#3B82F6] to-[#EC4899] bg-clip-text text-transparent">
      3D Art
    </span>
  </h1>

  {/* Subheading */}
  <p
    className="heading relative exo z-10 mt-6 text-gray-300 
      text-sm md:text-xl max-w-3xl mx-auto leading-relaxed"
  >
    Explore premium-quality 3D models designed for creators, architects, and
    innovators. From futuristic concepts to timeless digital assets — bring
    your vision to life.
  </p>

  {/* Buttons */}
  <div className="heading relative z-10 flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
    {/* Primary */}
    <Link href="/shop" className="w-full">
      <button
        className="w-full px-6 py-3 exo rounded-lg font-semibold text-base sm:text-lg 
          bg-gradient-to-r from-[#4e47af] to-[#4C1D95]
          text-white shadow-md 
          hover:shadow-lg hover:scale-[1.02] 
          active:scale-[0.98]
          transition-all duration-300"
      >
        Explore Catalog
      </button>
    </Link>

    {/* Secondary */}
    <Link href="/about" className="w-full">
      <button
        className="w-full px-6 py-3 exo rounded-lg font-semibold text-base sm:text-lg 
          bg-white text-[#1E1B4B] shadow-md 
          hover:bg-gray-100 hover:shadow-lg hover:scale-[1.02] 
          active:scale-[0.98]
          transition-all duration-300"
      >
        Learn More
      </button>
    </Link>
  </div>

  {/* Selling Points */}
  <div className="heading relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 max-w-5xl exo">
    <div className="p-6 rounded-xl bg-white/30 backdrop-blur-lg hover:scale-105 shadow-md hover:shadow-lg transition duration-450">
      <h3 className="text-white font-semibold text-lg">High-Quality Assets</h3>
      <p className="text-gray-200 text-sm mt-2">
        Carefully crafted 3D models optimized for performance & realism.
      </p>
    </div>
    <div className="p-6 rounded-xl bg-white/30 backdrop-blur-lg hover:scale-105 shadow-md hover:shadow-lg transition duration-450">
      <h3 className="text-white font-semibold text-lg">Creative Freedom</h3>
      <p className="text-gray-200 text-sm mt-2">
        Perfect for games, animations, and architectural designs.
      </p>
    </div>
    <div className="p-6 rounded-xl bg-white/30 backdrop-blur-lg hover:scale-105 shadow-md hover:shadow-lg transition duration-450">
      <h3 className="text-white font-semibold text-lg">Instant Download</h3>
      <p className="text-gray-200 text-sm mt-2">
        Access your 3D assets immediately after purchase.
      </p>
    </div>
  </div>
</section>

  );
};

export default Hero;
