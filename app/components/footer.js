// components/Footer.tsx
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-[#365a41] text-gray-300 pt-16 pb-20 overflow-hidden">
      {/* Big Background Text (Fixed to Bottom) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-10 select-none pointer-events-none">
        <h1 className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-extrabold tracking-widest text-white leading-none">
          VENDORZ
        </h1>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 grid md:grid-cols-4 gap-12 z-10">
        {/* Left Side */}
        <div>
          <h3 className="uppercase text-sm font-sans font-semibold text-gray-400 tracking-wide mb-4">
            Licenses &nbsp; | &nbsp; Coming Soon &nbsp; | &nbsp; 404
          </h3>
          <h2 className="text-2xl font-bold font-sans text-white leading-snug mb-3">
            Crafting Unique Glass Designs <br /> for Elegant Living.
          </h2>
          <p className="text-sm text-gray-400 font-sans">
            We are not just a glass store — we are artists, creators, and curators
            of timeless glass design.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-white transition-colors"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><FaYoutube size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><FaXTwitter size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="uppercase text-sm font-semibold text-gray-400 mb-4">
            Links
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition-colors font-sans">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors font-sans">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors font-sans">Blogs</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors font-sans">Feedback</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="uppercase text-sm font-semibold text-gray-400 mb-4">
            Policies
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors font-sans">Return Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors font-sans">Refund Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors font-sans">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors font-sans">Terms &amp; Conditions</a></li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="uppercase text-sm font-semibold text-gray-400 mb-4 font-sans">
            Contact Us
          </h3>
          <p className="text-sm font-sans">2972 Westheimer Rd.<br /> Santa Ana, Illinois 85486</p>
          <p className="text-sm mt-3">
            <a href="mailto:hello@example.com" className="hover:text-white transition-colors">
              hello@example.com
            </a>
          </p>
          <p className="text-sm">+1 (234) 567 8910</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="relative z-10 text-center mt-12 text-xs text-gray-500">
        © 2025 Vendorz | Work by Onmix. Made with Next.js & Tailwind.
      </div>
    </footer>
  );
}
