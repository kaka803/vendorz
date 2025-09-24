"use client";
import React from "react";

const VendorSection = () => {
  return (
    <section className="w-full overflow-hidden bottom-border border-top text-white py-16">
      <marquee
        behavior="scroll"
        direction="left"
        scrollamount="10"
        className="orbitron uppercase text-6xl md:text-8xl font-extrabold whitespace-nowrap tracking-wide"
      >
        3dvendorz • 3D Modeling Files Marketplace • 3dvendorz • 3D Modeling Files Marketplace •
      </marquee>
    </section>
  );
};

export default VendorSection;
