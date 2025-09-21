import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-[#365a41] font-sans text-white pt-16 pb-5 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        
        <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-extrabold text-white opacity-5 select-none">
          3dvendorz
        </h1>
        
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 grid md:grid-cols-4 gap-12 z-10">
        {/* Left Side - Logo & About */}
        <div>
          <h1 className="text-3xl font-bold font-sans mb-4">
            <Link href="/" className="hover:text-gray-200 transition-colors">
              <img src="/logo.svg" alt="" className="w-30 filter-invert opacity-80" />
            </Link>
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed font-sans">
            3dvendorz is a global platform for buying and selling
            high-quality 3D models, print-ready files, and textures for
            use in CG, game development, 3D printing, and architectural
            visualization.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-gray-200">
            <Link href="#" target="_blank" className="hover:text-white transition-colors">
              <FaFacebookF size={18} />
            </Link>
            <Link href="#" target="_blank" className="hover:text-white transition-colors">
              <FaInstagram size={18} />
            </Link>
            <Link href="#" target="_blank" className="hover:text-white transition-colors">
              <FaYoutube size={18} />
            </Link>
            <Link href="#" target="_blank" className="hover:text-white transition-colors">
              <FaXTwitter size={18} />
            </Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-base font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-base font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/commercial" className="hover:text-white transition-colors">
                Commercial Agreement
              </Link>
            </li>
            <li>
              <Link href="/Terms" className="hover:text-white transition-colors">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Refunds
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-base font-semibold mb-4">Contacts</h3>
          <p className="text-sm text-gray-200">
            DEKARTOPO SYSTEMS LIMITED <br />
            Reg. No: 16714225
          </p>
          <p className="text-sm text-gray-200 mt-3">+XXXXXXXX</p>
          <p className="text-sm text-gray-200">
            <Link href="mailto:hello@3dvendorz.com" className="hover:text-white">
              hello@3dvendorz.com
            </Link>
          </p>
          <p className="text-sm text-gray-200 mt-3 leading-relaxed">
            Registered office and headquarters <br />
            Unit B2 at Shoreditch Exchange, Senna Building, Gorsuch
            Place, London, E2 8JF
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="relative text-center mt-12 text-xs text-gray-300 border-t border-gray-400/30 pt-6 z-10">
        © 2025 3dvendorz | All rights reserved.
      </div>
    </footer>
  );
}
