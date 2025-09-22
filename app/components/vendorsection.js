"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VendorSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
const ctx = gsap.context(() => {
    gsap.to(element.querySelector(".vendor-text"), {
      x: "-100%", // text scroll karega left se right
      ease: "none",
      scrollTrigger: {
        scroller:'body',
        trigger: element,
        start: "top 0", // jab section center pe aaye tab start ho
        end: "+=200%", // jitna scroll distance chahiye adjust kar sakte ho
        pin: true, // pin sirf is section ko
        scrub: true, 
      },
    });
  });

  return () => ctx.revert(); // cleanup to prevent glitches
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-x-hidden bg-[#365a41] h-[100vh] text-white  flex items-center overflow-hidden py-20"
    >
      <h1 className="vendor-text uppercase pl-5 max-md:text-7xl text-9xl font-extrabold whitespace-nowrap tracking-wide">
        3dvendorz • 3D Modeling Files Marketplace
      </h1>
    </section>
  );
};

export default VendorSection;
