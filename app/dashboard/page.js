"use client";
import React, { useState } from "react";
import {
  Menu,
  Home,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Percent,
  Plus,
} from "lucide-react";
import { useProducts } from "../context/productcontext";


const dummyProducts = [
  { _id: 1, name: "Product 1", originalPrice: 2000, onSale: true, image: "/p1.png" },
  { _id: 2, name: "Product 2", originalPrice: 1500, onSale: false, image: "/p2.png" },
];

const dummyUsers = [
  { _id: 1, name: "Ali", email: "ali@test.com", role: "Customer" },
  { _id: 2, name: "Hassan", email: "hassan@test.com", role: "Customer" },
];

const dummyOrders = [
  { _id: 1, shippingAddress: { firstName: "Ali" }, total: 3000, createdAt: "2025-09-16T10:00:00Z", status: "Pending" },
  { _id: 2, shippingAddress: { firstName: "Hassan" }, total: 5000, createdAt: "2025-09-17T14:00:00Z", status: "Delivered" },
];

const dummySalesData = [
  { name: "Week 1", sales: 5000 },
  { name: "Week 2", sales: 3000 },
  { name: "Week 3", sales: 7000 },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("products");

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 w-64 bg-white shadow-md h-full transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 font-bold text-xl border-b">Admin Panel</div>
        <nav className="p-4 space-y-3 text-gray-800">
          {[
            { key: "products", label: "Products", icon: Package },
            { key: "users", label: "Users", icon: Users },
            { key: "orders", label: "Orders", icon: ShoppingCart },
            { key: "add-product", label: "Add product", icon: Plus },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg transition-all duration-200 ${
                activePage === item.key
                  ? "bg-gray-200 text-gray-800 shadow-sm font-semibold"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 py-5 sticky top-0 z-20 bg-white border-b">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold capitalize">{activePage}</h1>
          <button className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition-all">
            Logout
          </button>
        </header>

        {/* Pages */}
        <main className="p-6 space-y-8 bg-gray-50 overflow-y-auto">
          

          {/* Products */}
          {activePage === "products" && (
            <div>
              <h2 className="text-xl font-bold mb-4">All Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white p-4 rounded-xl shadow flex flex-col justify-between"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[40%] object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm">
                      Rs. {new Intl.NumberFormat("en-US").format(product.originalPrice)}
                    </p>
                    <button
                      className={`mt-auto py-1.5 px-3 rounded-md text-sm font-medium flex items-center gap-2 ${
                        product.onSale
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Percent size={16} />
                      {product.onSale ? "On Sale" : "Add Sale"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users */}
          {activePage === "users" && (
            <div>
              <h2 className="text-xl font-bold mb-4">All Users</h2>
              <table className="min-w-full text-sm bg-white rounded-xl shadow">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyUsers.map((u, i) => (
                    <tr key={u._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{i + 1}</td>
                      <td className="py-3 px-4">{u.name}</td>
                      <td className="py-3 px-4">{u.email}</td>
                      <td className="py-3 px-4">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Orders */}
          {activePage === "orders" && (
            <div>
              <h2 className="text-xl font-bold mb-4">All Orders</h2>
              <table className="min-w-full text-sm bg-white rounded-xl shadow">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="py-2 px-4">#</th>
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Total</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyOrders.map((o, i) => (
                    <tr key={o._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{i + 1}</td>
                      <td className="py-2 px-4">{o.shippingAddress.firstName}</td>
                      <td className="py-2 px-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-4">Rs. {o.total}</td>
                      <td className="py-2 px-4">{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Product */}
          {activePage === "add-product" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Add New Product</h2>
              <div className="bg-white rounded-xl p-6 shadow max-w-4xl">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    placeholder="Product Description"
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={4}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Category" className="p-2 border rounded" />
                    <input type="text" placeholder="Brand" className="p-2 border rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="Original Price" className="p-2 border rounded" />
                    <input type="number" placeholder="Discounted Price" className="p-2 border rounded" />
                  </div>
                  <input type="file" className="w-full p-2 border rounded" />
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">
                    <Plus size={16} /> Add Product
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
