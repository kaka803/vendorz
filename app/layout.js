import { Geist, Geist_Mono, Josefin_Sans, Orbitron, Exo } from "next/font/google";
import { ProductProvider } from "./context/productcontext";
import { CartProvider } from "./context/cartcontext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";
import { CurrencyProvider } from "./context/CurrencyContext";

// Geist Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Josefin Sans
const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

// Orbitron
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

// Exo
const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "3D Vendorz - 3D Product Files Marketplace",
  description: "Buy and sell high-quality 3D product files for your projects at 3D Vendorz.",
  icons: {
    icon: "/logo.svg", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${josefinSans.variable} 
          ${orbitron.variable} 
          ${exo.variable} 
          antialiased
        `}
      >
        <CurrencyProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <SmoothScroll />
                {children}
                <Toaster
                  position="top-right"
                  reverseOrder={false}
                  toastOptions={{
                    style: {
                      marginTop: "100px",
                      fontFamily: "sans-serif",
                      pointerEvents: "auto"
                    },
                  }}
                />
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
