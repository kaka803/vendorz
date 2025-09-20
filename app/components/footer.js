import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white font-sans text-black pt-16 pb-5">
      {/* Content */}
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
        {/* Left Side - Logo & About */}
        <div>
          <h1 className="text-3xl font-bold font-sans mb-4">
            <span className="text-black">3d</span>
            <span className="text-gray-700">vendorz</span>
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed font-sans">
            3dvendorz is a global platform for buying and selling
            high-quality 3D models, print-ready files, and textures for
            use in CG, game development, 3D printing, and architectural
            visualization.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-gray-600">
            <a href="#" className="hover:text-black transition-colors">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <FaYoutube size={18} />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <FaXTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-base font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-black transition-colors">
                Quick FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-base font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-black transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors">
                Commercial Agreement
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors">
                Refunds
              </a>
            </li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-base font-semibold mb-4">Contacts</h3>
          <p className="text-sm text-gray-600">
            DEKARTOPO SYSTEMS LIMITED <br />
            Reg. No: 16714225
          </p>
          <p className="text-sm text-gray-600 mt-3">+XXXXXXXX</p>
          <p className="text-sm text-gray-600">
            hello@3dvendorz.com
          </p>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            Registered office and headquarters <br />
            Unit B2 at Shoreditch Exchange, Senna Building, Gorsuch
            Place, London, E2 8JF
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-12 text-xs text-gray-500 border-t pt-6">
        © 2025 3dvendorz | All rights reserved.
      </div>
    </footer>
  );
}
