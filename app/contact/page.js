"use client";
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import CurrencySidebar from "../components/CurrencySidebar";

export default function ContactPage() {
  const [contactloading, setcontactloading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  setcontactloading(true)
  e.preventDefault();

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setcontactloading(false)

    if (data.success) {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error("⚠️ Something went wrong!");
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Something went wrong!");
  }
};


  return (
    <>
    <CurrencySidebar />
    <Navbar/>
    <div className="min-h-screen mt-20  flex-col flex  justify-center items-start py-16 px-6">
        <h1 className="text-4xl text-black text-center font-semibold font-sans w-full">Contact Us</h1>
      <div className="w-full main-container font-sans bg-white rounded-lg  p-8">
        {/* Company Info */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            DEKARTOPO SYSTEMS LIMITED
          </h2>
          <p className="text-gray-600">Reg. No: 16714225</p>
          <p className="text-gray-600 mt-2">+XXXXXXX</p>
          <p className="text-gray-600">hello@cozyrender.com</p>
          <p className="text-gray-600 mt-2">
            Office: Unit B2 at Shoreditch Exchange, Senna Building, Gorsuch
            Place, London, E2 8JF
          </p>
          <p className="text-gray-600">
            Legal: 5 Brayford Square, London, England, E1 0SG
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-[#365a41] focus:border-[#365a41]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-[#365a41] focus:border-[#365a41]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-[#365a41] focus:border-[#365a41]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-[#365a41] focus:border-[#365a41]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#43644d] text-white font-semibold flex justify-center items-center px-8 h-11 rounded-full hover:bg-[#365a41] transition"
          >
            {contactloading ? <HashLoader size={20} color="white"/>:'SEND'}
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}
