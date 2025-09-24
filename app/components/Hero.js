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
      className="relative min-h-screen flex flex-col justify-center items-center text-center py-30 px-6 overflow-hidden hero-bg"
    >
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.15),transparent_70%)]" />

      {/* Heading */}
      <h1 className="heading orbitron relative z-10 text-white drop-shadow-xl text-3xl sm:text-5xl md:text-6xl  font-bold uppercase tracking-tight leading-tight">
        Redefining Digital Spaces <br className="hidden sm:block" />
        with <span className="bg-gradient-to-r from-[#3B82F6] to-[#EC4899] bg-clip-text text-transparent">3D Art</span>
      </h1>

      {/* Subheading */}
      <p className="heading relative exo z-10 mt-4 text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl font-sans leading-relaxed">
        Explore premium-quality 3D models designed for creators, architects, and innovators. 
        <br className="hidden md:block" />
        From futuristic concepts to timeless digital assets — bring your vision to life.
      </p>

      {/* Buttons */}
     <div className="heading relative z-10 flex flex-wrap justify-center items-center gap-4 mt-6">
  {/* Primary Button */}
  <Link href="/shop">
    <button className="px-8 py-3 exo rounded-xl font-semibold text-base sm:text-lg 
      bg-gradient-to-r from-[#6b65dd] to-[#4C1D95]
      text-white shadow-[0_4px_0_#4C1D95] 
      hover:shadow-[0_6px_15px_rgba(109,40,217,0.6)] 
      hover:translate-y-[-2px] hover:scale-105 
      active:translate-y-[2px] active:shadow-none 
      transition-all duration-300">
      🚀 Explore Catalog
    </button>
  </Link>

  {/* Secondary Button */}
  <Link href="/about">
    <button className="px-8 py-3 exo rounded-xl font-semibold text-base sm:text-lg 
      bg-white text-[#1E1B4B] shadow-[0_4px_0_#d1d5db] 
      hover:bg-gradient-to-r hover:from-[#F3F4F6] hover:to-[#E5E7EB] 
      hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] 
      hover:translate-y-[-2px] hover:scale-105 
      active:translate-y-[2px] active:shadow-none 
      transition-all duration-300">
      ℹ️ Learn More
    </button>
  </Link>
</div>



      {/* Extra Selling Points */}
      <div className="heading relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl exo">
        <div className=" p-6 rounded-xl shadow-md hover:shadow-lg white-border transition">
          <h3 className="text-white font-semibold text-lg exo">High-Quality Assets</h3>
          <p className="text-gray-400 text-sm mt-2">Carefully crafted 3D models optimized for performance & realism.</p>
        </div>
        <div className="white-border p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-white font-semibold text-lg">Creative Freedom</h3>
          <p className="text-gray-400 text-sm mt-2">Perfect for games, animations, and architectural designs.</p>
        </div>
        <div className="white-border p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-white font-semibold text-lg">Instant Download</h3>
          <p className="text-gray-400 text-sm mt-2">Access your 3D assets immediately after purchase.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
