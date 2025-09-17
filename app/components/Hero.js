"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);

 useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".heading", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
        stagger: 0.3,
      });
    });

    return () => ctx.revert(); // cleanup to prevent glitches
  }, []);

  return (
    <div
      ref={heroRef}
      className="flex flex-col justify-center items-center gap-2 mt-20 px-4 text-center"
    >
      {/* Heading */}
      <h1 className="text-white heading drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold uppercase leading-tight">
        Redefining Spaces <br className="hidden sm:block" /> with 3D Modeling Art
      </h1>

      {/* Subheading */}
      <p className="text-base heading drop-shadow-lg sm:text-lg md:text-xl font-sans text-gray-200 max-w-2xl">
        Discover stunning 3D-designed glassware and mirrors, crafted to bring <br className="hidden md:block" /> modern beauty into timeless spaces.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap heading justify-center items-center gap-4 mt-4">
        <button className="bg-[#365a41] hover:bg-white hover:text-black transition px-8 py-3 rounded-lg font-sans text-sm sm:text-base md:text-lg uppercase">
          Shop
        </button>
        <button className="bg-[#365a41] hover:bg-white hover:text-black transition px-8 py-3 rounded-lg font-sans text-sm sm:text-base md:text-lg uppercase">
          Explore Catalog
        </button>
      </div>
    </div>
  );
};

export default Hero;
