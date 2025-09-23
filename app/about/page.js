import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CurrencySidebar from "../components/CurrencySidebar";
export default function AboutPage() {

  return (
    <>
    <CurrencySidebar />
    <Navbar/>
    <div className="min-h-screen mt-10 flex justify-center items-start py-16 px-6">
      <div className="w-full main-container bg-white rounded-lg  p-8 leading-relaxed font-sans">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          About 3D Vendorz
        </h1>

        {/* Content */}
        <div className="space-y-6 text-gray-700">
          <p>
            <span className="font-semibold">3D Assets. Zero Hassle. All Cozy.</span>
          </p>

          <p>
            3D Vendorz exists to make your projects smoother, faster, and
            better-looking. Our high-quality 3D files are trusted by game
            developers, architects, ad agencies, visual effects teams, and
            designers around the globe.
          </p>

          <p>
            Whether you are an artist or just someone with a looming deadline,
            chances are you have seen our models in action—on screens, in
            campaigns, in renderings—without even realizing it. That is by
            design.
          </p>

          <p>
            <span className="font-semibold">Our mission is simple:</span> save
            you the hours (and headaches) of building models from scratch. On
            average, customers tell us they save over 25 hours per file
            downloaded. Multiply that across a tight production schedule, and
            you get the picture.
          </p>

          <p>
            But we are not just a marketplace. 3D Vendorz is a growing global
            ecosystem of talented 3D artists. We help creators earn income doing
            what they do best—while continually leveling up the quality and
            variety of our library.
          </p>

          <p>
            We are proudly headquartered in London, operating under:
          </p>

          {/* Company Info */}
          <div className="mt-6 space-y-1">
            <p className="font-semibold text-gray-900">
              DEKARTOPO SYSTEMS LIMITED
            </p>
            <p>Reg. No: 16714225</p>
            <p>
              Office: Unit B2, Shoreditch Exchange, Senna Building, Gorsuch
              Place, London, E2 8JF
            </p>
            <p>hello@3D Vendorz.com</p>
            <p>+XXXXXXX</p>
          </div>

          <p className="mt-6">
            Whether you are building a world, selling a vision, or trying to hit
            render before midnight—3D Vendorz is here to make it look good.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
