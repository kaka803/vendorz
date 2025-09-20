"use client";
import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { useCart } from "../context/cartcontext";
import Link from "next/link";
import SearchOverlay from "./searchOverlay";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation"; //

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
const pathname = usePathname();
 const isActive = (path) =>
    pathname === path ? "border-b-2 border-black pb-1" : "";
  return (
    <>
      <div className="w-full navbar px-4 fixed top-5 z-30">
        <div className="max-w-[1280px] rounded-lg backdrop-blur-md bg-white/60 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.15)] mx-auto flex justify-between items-center h-19 px-6">


          {/* Left Links */}
          <div className="hidden md:flex space-x-6 text-[black] font-semibold">
            <Link
              href="/"
              className={`text-[black] font-semibold font-sans  ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`text-[black] font-semibold font-sans  ${isActive("/shop")}`}
            >
              Shop
            </Link>
            <Link
              href="/myorders"
              className={`text-[black] font-semibold font-sans  ${isActive("/myorders")}`}
            >
              My Orders
            </Link>
            <Link
              href="/about"
              className={`text-[black] font-semibold font-sans  ${isActive("/myorders")}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-[black] font-semibold font-sans  ${isActive("/myorders")}`}
            >
              Contact Us
            </Link>
          </div>

          {/* Logo */}
          <div className="text-white font-bold text-3xl mt-2 md:mt-0 lg:text-5xl  "><img src="/logo.svg" alt="" className="w-40 max-md:w-24" /></div>

          {/* Right Side */}
          <div className="flex items-center space-x-6 max-md:space-x-3">
            {/* Search Icon */}
            <button onClick={() => setSearchOpen(true)} className="text-black ml-5 hover:text-gray-800">
              <Search size={22} />
            </button>

            {/* Cart */}
            <Link href="/cart">
              <button className="text-black hover:text-gray-800 mt-2 mr-2  relative">
                <ShoppingCart size={22} />
                <span className="absolute -top-4 -right-3 bg-white font-sans text-green-950 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </button>
            </Link>

            {/* Conditional User/Login */}
            {user ? (
              <div className="relative hidden md:block">
                <button onClick={() => setAvatarDropdown(!avatarDropdown)} className="w-8 h-8 rounded-full bg-[#43644d] flex items-center justify-center font-sans text-white font-bold uppercase">
                  {user.name[0]}
                </button>

                {avatarDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                    <div className="p-3 border-b text-sm text-gray-700">
                      <p className="font-medium">{user.name}</p>
                      <p className="truncate text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setAvatarDropdown(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth">
                  <button className="bg-[#43644d] max-md:hidden text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                    Login
                  </button>
                </Link>
                
              </>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden text-black" onClick={() => setIsOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-[white] text-black transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-20`}>
          <div className="flex justify-end p-4">
            <button onClick={() => setIsOpen(false)}>
              <X size={26} className="text-black" />
            </button>
          </div>
          <div className="flex flex-col space-y-6 mt-10 px-6 font-semibold">
             <Link
              href="/"
              className={`text-black   ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`text-black   ${isActive("/shop")}`}
            >
              Shop
            </Link>
            <Link
              href="/myorders"
              className={`text-black   ${isActive("/myorders")}`}
            >
              My Orders
            </Link>
            <Link
              href="/about"
              className={`text-black   ${isActive("/myorders")}`}
            >
              About
            </Link>
            <Link
              href="/Contact"
              className={`text-black   ${isActive("/myorders")}`}
            >
              Contact Us
            </Link>

            {user ? (
             <div className="relative">
                <button onClick={() => setAvatarDropdown(!avatarDropdown)} className="w-8 h-8 rounded-full bg-[#43644d] flex items-center justify-center text-white font-sans font-bold uppercase">
                  {user.name[0]}
                </button>

                {avatarDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                    <div className="p-3 border-b text-sm text-gray-700">
                      <p className="font-medium">{user.name}</p>
                      <p className="truncate text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setAvatarDropdown(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="bg-[#43644d]  text-[white] px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition w-fit">
                Login
              </button>
            )}
          </div>
        </div>

        {/* Background Overlay */}
        {isOpen && <div className="fixed inset-0 bg-black/40 z-10" onClick={() => setIsOpen(false)} />}
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
