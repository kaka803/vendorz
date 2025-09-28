// pages/refund-policy.js
import Navbar from "../components/navbar";
import React from "react";
import Footer from "../components/footer";
import CurrencySidebar from "../components/CurrencySidebar";

const RefundPolicy = () => {
  return (
    <>
    <CurrencySidebar />
    <Navbar/>
    <div className="min-h-screen mt-17 py-10 px-5 md:px-20 font-sans">
      <div className="main-container mx-auto   rounded-xl p-8">
        <h1 className="text-5xl text-center font-bold text-white mb-6">
          Refunds Policy
        </h1>

        <p className="text-gray-200 mb-6">
          If you purchased a 3D model from <span className="font-semibold">3DVendorz</span> and discovered an error in the renders or product description, we’ll make every effort to correct the issue promptly. If the issue cannot be resolved, your order will be cancelled and you will receive a full refund within 24 hours, provided the refund request meets the conditions below.
        </p>

        <p className="text-gray-200 mb-6">
          Once your order is processed, the item will be available for download in your Downloads section.
        </p>

        <h2 className="text-2xl font-semibold text-gray-300 mt-6 mb-4">When We Issue Refunds</h2>
        <p className="text-gray-200 mb-4">You are eligible for a full refund if:</p>
        <ul className="list-disc list-inside text-gray-200 mb-6 space-y-2">
          <li>The 3D model does not match the description</li>
          <li>The 3D model does not match the renders</li>
          <li>The 3D model does not match the technical specifications (e.g., missing textures/materials, wrong polygon/vertex count, not rigged/animated as stated)</li>
          <li>The model does not open in its native software</li>
          <li>The model is damaged or corrupted</li>
          <li>The model is missing essential files (e.g., textures)</li>
          <li>You request a refund before downloading the model (download count must be zero)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-300 mt-6 mb-4">When Refunds Are Not Provided</h2>
        <p className="text-gray-200 mb-4">Refunds will not be issued in the following cases:</p>
        <ul className="list-disc list-inside text-gray-200 mb-6 space-y-2">
          <li>The model lacks additional file formats not listed for sale (Tip: Use our free format conversion service)</li>
          <li>The conversion to your required format is not possible (Tip: Contact our support before purchase)</li>
          <li>You bought a file with the sole intention of converting it</li>
          <li>You changed your mind after purchase</li>
          <li>You bought the item by mistake</li>
          <li>You don’t want the model after downloading it</li>
          <li>The model doesn’t meet your personal expectations</li>
          <li>You’re requesting a refund as a gesture of goodwill</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-300 mt-6 mb-4">Store Credits Instead of Refunds</h2>
        <p className="text-gray-200 mb-4">In certain situations, we may offer Store Credits rather than a refund:</p>
        <ul className="list-disc list-inside text-gray-200 mb-6 space-y-2">
          <li>If the model is not faulty, but you realize it doesn’t meet your needs</li>
          <li>If you accidentally purchased and downloaded the wrong model</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-300 mt-6 mb-4">Important Notice</h2>
        <p className="text-gray-200 mb-6">
          This is not a “Try Before You Buy” offer. We sell digital 3D files, not physical goods. If you are unsure about a product’s compatibility, file format, or features, please contact us before purchasing to avoid any misunderstandings.
        </p>

        <h2 className="text-2xl font-semibold text-gray-300 mt-6 mb-4">Refund Process & Legal Requirements</h2>
        <p className="text-gray-200 mb-6">
          If a refund is approved:
        </p>
        <ul className="list-disc list-inside text-gray-200 mb-6 space-y-2">
          <li>You are legally required to delete all copies of the purchased files</li>
          <li>You will be asked to sign a document confirming that you no longer have access to, or rights to use, the product</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-300 mt-6 mb-4">Resolving Disputes</h2>
        <p className="text-gray-200 mb-6">
          If you and a content author cannot reach an agreement, you may escalate the issue. <span className="font-semibold">3DVendorz</span> will investigate the matter independently and make a final decision based on the evidence provided by both sides.
        </p>
        <p className="text-gray-200 mb-6">
          By using <span className="font-semibold">3DVendorz</span>, you agree that our dispute resolution decisions are final and binding.
        </p>

        <p className="text-gray-200 mb-6">Thank you for choosing <span className="font-semibold">3DVendorz</span>!</p>
        <p className="text-gray-200">
          If you have any questions, contact: <a href="mailto:support@3dvendorz.com" className="text-blue-600 underline">support@3dvendorz.com</a>
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default RefundPolicy;
