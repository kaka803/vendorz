"use client";
import { useState, useEffect, useMemo } from "react";
import { useProducts } from "../context/productcontext";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Navbar from "../components/navbar";
import { HashLoader } from "react-spinners";

export default function ShopPage() {
  const { allproducts, loading } = useProducts();

  // ✅ States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 25;

  // ✅ Categories dynamically nikalna (allproducts me se)
  const categories = useMemo(() => {
    return [...new Set(allproducts.map((p) => p.category))];
  }, [allproducts]);

  // ✅ Filtering + Sorting + Pagination apply karo
  const filteredProducts = useMemo(() => {
    let filtered = [...allproducts];

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Sorting
    if (sortOption === "low-high") {
      filtered = filtered.sort((a, b) => a.price_numeric - b.price_numeric);
    } else if (sortOption === "high-low") {
      filtered = filtered.sort((a, b) => b.price_numeric - a.price_numeric);
    }

    return filtered;
  }, [allproducts, selectedCategories, sortOption]);

  // ✅ Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // ✅ Current page ke products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // ✅ Category change handler
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // reset to first page
  };

  return (
    <>
      <Navbar />
      <div className="main-container mt-40 flex flex-col lg:flex-row gap-8 py-10 font-sans px-4 sm:px-6 lg:px-8">
        
        {/* Sidebar Filters */}
        <aside
          className="w-full lg:w-1/4 bg-white shadow rounded-md p-5
                     h-fit max-h-[80vh] overflow-y-auto
                     sticky top-20
                     order-2 lg:order-1"
        >
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="accent-[#365a41]"
                />
                <span className="text-sm text-gray-600">{cat}</span>
              </label>
            ))}
          </div>

          {/* Sorting */}
          <div>
            <h3 className="text-sm font-medium mb-2">Sort By</h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded px-2 py-1 w-full text-sm"
            >
              <option value="">Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4 order-1 lg:order-2">
          {loading ? (
            <div className="flex justify-center items-center h-full w-full">
              <HashLoader size={50} color="#365a41" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <Link key={product._id} href={`/product/${product._id}`}>
                      <div className="group hover:scale-105 hover:-translate-y-2 duration-500 bg-white rounded-sm shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer">
                        {/* Product Image */}
                        <div className="w-full h-56 sm:h-60 overflow-hidden relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Hover Add to Cart */}
                          <div className="absolute bottom-[-60px] left-0 w-full flex justify-center transition-all duration-500 group-hover:bottom-0">
                            <button className="flex justify-center w-full items-center gap-2 bg-[#365a41] text-white px-6 py-2 shadow transition">
                              <ShoppingCart size={18} />
                              Add to Cart
                            </button>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-sans font-semibold text-gray-800 truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm font-sans text-gray-500 mt-1 line-clamp-2">
                            {product.description}
                          </p>
                          <p className="mt-3 font-sans text-xl font-bold text-[#365a41]">
                            ${product.price_numeric}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">No products found</p>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 rounded text-sm border ${
                        currentPage === index + 1
                          ? "bg-[#365a41] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
