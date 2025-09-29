"use client";
import React, { useEffect, useState } from "react";
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
import { HashLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Pagination from "../components/Paginate";
import { formatCurrency } from "@/lib/formatcurrency";
import { selector } from "gsap";






export default function DashboardPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");

    if (adminInfo) {
      setAllowed(true); // ✅ agar mila to access do
    } else {
      router.replace("/adminlogin"); // ❌ agar nahi mila to login pe bhej do
    }
  }, [router]);
  const {allproducts, fetchAllProducts, loading, setallproducts, allproductloadidng} = useProducts();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("products");
  const [Users, setUsers] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [Orders, setOrders] = useState([])
   const [form, setForm] = useState({
    url: "",
    title: "",
    description: "",
    price: "",
    price_numeric: 0,
    original_price: "",
    discount: "",
    currency: "USD",
    vendor: "",
    images: "",
    file_formats: "",
    category: "",
    product_id: "",
    is_paid: false,
    polygon_count: 0,
    vertices_count: 0,
    file_size: "",
    render_engine: "",
    animated: false,
    textured: false,
    rigged: false,
    materials: false,
    low_poly: false
  });
  const [addLoading, setAddLoading] = useState(false);
  // --- Add State for Pagination ---
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 25;

// Calculate indexes
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = allproducts.slice(indexOfFirstProduct, indexOfLastProduct);

const totalPages = Math.ceil(allproducts.length / productsPerPage);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  useEffect(() => {
    fetchAllProducts()
  }, [])
  
  const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch("/api/delete-product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      // Remove deleted product from state
      setallproducts((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert(data.error || "Failed to delete product");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong while deleting product");
  }
};


useEffect(() => {
  const fetchalluser = async () =>  {
    const res = await fetch('/api/getuser')
    const data = await res.json()
    if(data?.users){
      setUsers(data.users)
    } 


  }
  fetchalluser()
}, [])
useEffect(() => {
  const fetchorder = async () =>  {
    const res = await fetch('/api/getorder')
    const data = await res.json()
    if(data?.orders){
      setOrders(data.orders)
    } 


  }
  fetchorder()
}, [])


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddLoading(true);

    // Convert comma-separated strings to arrays
    const imagesArray = form.images.split(",").map(img => img.trim()).filter(Boolean);
    const fileFormatsArray = form.file_formats.split(",").map(f => f.trim()).filter(Boolean);

    const body = {
      ...form,
      images: imagesArray,
      file_formats: fileFormatsArray,
      price_numeric: Number(form.price_numeric),
      original_price: form.original_price ? Number(form.original_price) : null,
      discount: form.discount ? Number(form.discount) : null,
    };

    try {
      const res = await fetch("/api/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product added successfully!");
        setForm({
          url: "",
          title: "",
          description: "",
          price: "",
          price_numeric: 0,
          original_price: "",
          discount: "",
          currency: "USD",
          vendor: "",
          images: "",
          file_formats: "",
          category: "",
          product_id: "",
          is_paid: false,
          polygon_count: 0,
          vertices_count: 0,
          file_size: "",
          render_engine: "",
          animated: false,
          textured: false,
          rigged: false,
          materials: false,
          low_poly: false
        });
      } else {
        alert(data.error || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setAddLoading(false);
    }
  };

  const handleLogout = () => {
    // 🗑️ Admin info clear from localStorage
    localStorage.removeItem("adminInfo");

    // 🔄 Redirect to login page
    router.push("/adminlogin");
  };
  return (
    <div className="flex min-h-screen  font-sans bg-white text-black">
      {/* Sidebar */}
      <div
    className={`fixed lg:sticky top-0 z-40 w-64 bg-white shadow-md h-screen transition-transform duration-300 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
  >
        <div className="p-4 font-bold text-xl border-b orbitron">Admin Panel</div>
        <nav className="p-4 space-y-3 text-gray-800 exo">
         {[
  { key: "products", label: "Products", icon: Package },
  { key: "users", label: "Users", icon: Users },
  { key: "orders", label: "Orders", icon: ShoppingCart },
  { key: "add-product", label: "Add product", icon: Plus },
].map((item) => {
  const Icon = item.icon; // ✅ assign to uppercase variable
  return (
    <button
      key={item.key}
      onClick={() => setActivePage(item.key)}
      className={`flex items-center exo gap-2 px-4 py-2 w-full text-left rounded-lg transition-all duration-200 ${
        activePage === item.key
          ? "bg-gray-200 text-gray-800 shadow-sm font-semibold"
          : "hover:bg-gray-100 text-gray-800"
      }`}
    >
       {item.label} {/* ✅ use uppercase variable */}
    </button>
  );
})}

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
        <header className="flex items-center justify-between px-4 py-3 exo sticky top-0 z-20 bg-white border-b">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold capitalize exo">{activePage}</h1>
          <button onClick={handleLogout} className="bg-gradient-to-r from-[#4e47af]  to-[#4C1D95] text-white text-sm px-4 py-2 rounded hover:bg-gradient-to-r hover:from-[#413b92] hover:to-[#3f187a] duration-200 transition-all">
            Logout
          </button>
        </header>

        {/* Pages */}
        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          

          {/* Products */}
          {/* Products */}
{activePage === "products" && (
  allproductloadidng ? (
    <div className="flex justify-center items-center h-96">
      <HashLoader color="#365a41" />
    </div>
  ) : allproducts.length === 0 ? (
    <div className="text-center text-gray-500">No products found.</div>
  ) : (
    <div>
      <h2 className="text-xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-xl shadow flex flex-col justify-between"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-[40%] object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600 text-sm">${product.price_numeric}</p>
            <button
              className="mt-auto py-1.5 px-3 rounded-md text-sm font-medium flex items-center gap-2 bg-red-400 text-white hover:bg-red-300 transition"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Pagination Component */}
      <Pagination
        pageCount={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
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
                  {Users.map((u, i) => (
                    <tr key={u._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{i + 1}</td>
                      <td className="py-3 px-4">{u.name}</td>
                      <td className="py-3 px-4">{u.email}</td>
                      <td className="py-3 px-4">User</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

         

{activePage === "orders" && (
  <div>
    <h2 className="text-xl font-bold mb-4">All Orders</h2>

    {/* ✅ Desktop Table */}
    <div className="hidden md:block">
      <table className="min-w-full text-sm bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Customer</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Total</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {Orders.map((o, i) => (
            <tr
              key={o._id}
              className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedOrder(o)}
            >
              <td className="py-2 px-4">{i + 1}</td>
              <td className="py-2 px-4 font-medium">
                {o.shippingAddress.firstName + " " + o.shippingAddress.lastName}
              </td>
              <td className="py-2 px-4">
                {new Date(o.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 font-semibold">
                ${formatCurrency(o.total)}
              </td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    o.paymentStatus.toLowerCase() === "processed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {o.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* ✅ Mobile Cards */}
    <div className="grid gap-4 md:hidden">
      {Orders.map((o, i) => (
        <div
          key={o._id}
          className="bg-white shadow rounded-lg p-4 border cursor-pointer"
          onClick={() => setSelectedOrder(o)}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm">
              {o.shippingAddress.firstName + " " + o.shippingAddress.lastName}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                o.paymentStatus.toLowerCase() === "processed"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {o.paymentStatus}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            <strong>Date:</strong> {new Date(o.createdAt).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-600">
            <strong>Total:</strong> ${formatCurrency(o.total)}
          </p>
          <p className="text-xs text-gray-600">
            <strong>Order #:</strong> {i + 1}
          </p>
        </div>
      ))}
    </div>

    {/* Modal same rahega */}
    {selectedOrder && (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white h-[50vh] overflow-scroll rounded-xl shadow-lg max-w-3xl w-full p-6 relative">
          <button
            onClick={() => setSelectedOrder(null)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
          <h3 className="text-xl font-bold mb-4">Order Details</h3>

          <div className="space-y-2">
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {selectedOrder.shippingAddress.firstName +
                " " +
                selectedOrder.shippingAddress.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.shippingAddress.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder.shippingAddress.phone}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedOrder.shippingAddress.description}
            </p>
            <p>
              <strong>Shipping Fee:</strong> ${selectedOrder.shippingFee}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.total}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.paymentStatus}
            </p>
            <p>
              <strong>Reference ID:</strong> {selectedOrder.referenceId}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Products</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedOrder.products.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-4 border p-2 rounded"
                >
                  <img
                    src={p.image}
                    alt={p.id}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">ID: {p.id}</p>
                    <p>Quantity: {p.quantity}</p>
                    <p>Price: Rs. {p.price}</p>
                    <p>Subtotal: Rs. {p.subtotal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)}




          {/* Add Product */}
          {/* Add Product */}
{activePage === "add-product" && (
  <div className="bg-white p-6 rounded-xl shadow max-w-4xl mx-auto">
    <h2 className="text-xl font-bold mb-4">Add New Product</h2>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product URL"
        name="url"
        value={form.url}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Product Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={3}
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Category (e.g., Sport Cars)"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Vendor Name"
          name="vendor"
          value={form.vendor}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Price ($50)"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <label className="flex flex-col">
          Price Numeric
          <input
            type="number"
            name="price_numeric"
            value={form.price_numeric}
            onChange={handleChange}
            className="p-2 border rounded mt-1"
          />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <label className="flex flex-col">
          Original Price (optional)
          <input
            type="number"
            name="original_price"
            value={form.original_price}
            onChange={handleChange}
            className="p-2 border rounded mt-1"
          />
        </label>
        <label className="flex flex-col">
          Discount % (optional)
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="p-2 border rounded mt-1"
          />
        </label>
        <label className="flex flex-col">
          Polygon Count
          <input
            type="number"
            name="polygon_count"
            value={form.polygon_count}
            onChange={handleChange}
            className="p-2 border rounded mt-1"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col">
          Vertices Count
          <input
            type="number"
            name="vertices_count"
            value={form.vertices_count}
            onChange={handleChange}
            className="p-2 border rounded mt-1"
          />
        </label>
        <input
          type="text"
          placeholder="Render Engine (e.g., VRay)"
          name="render_engine"
          value={form.render_engine}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <input
        type="text"
        placeholder="Images (comma separated URLs)"
        name="images"
        value={form.images}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="File Formats (comma separated, e.g., .OBJ,.FBX)"
        name="file_formats"
        value={form.file_formats}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Product ID"
        name="product_id"
        value={form.product_id}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="File Size (e.g., 15.99 MB)"
        name="file_size"
        value={form.file_size}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Checkboxes */}
      <div className="grid grid-cols-3 gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="animated" checked={form.animated} onChange={handleChange}/> Animated
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="textured" checked={form.textured} onChange={handleChange}/> Textured
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="rigged" checked={form.rigged} onChange={handleChange}/> Rigged
        </label>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="materials" checked={form.materials} onChange={handleChange}/> Materials
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="low_poly" checked={form.low_poly} onChange={handleChange}/> Low Poly
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="is_verified" checked={form.is_verified} onChange={handleChange}/> Verified
        </label>
      </div>

      <button
        type="submit"
        disabled={addLoading}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <Plus size={16}/> {addLoading ? "Adding..." : "Add Product"}
      </button>
    </form>
  </div>
)}



        </main>
      </div>
    </div>
  );
}
