import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import { ProductProvider } from "./context/productcontext";
import { CartProvider } from "./context/cartcontext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} antialiased`}
      >
        <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <SmoothScroll />
        {children}
        <Toaster position="top-right" reverseOrder={false} toastOptions={{
    style: {
      marginTop: '100px', 
      fontFamily: 'sans-serif',
    },
  }} />
          </CartProvider>
        </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
