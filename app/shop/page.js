"use client";
import { useState, useMemo } from "react";
import { useProducts } from "../context/productcontext";
import Link from "next/link";
import { ShoppingCart, ChevronDown, Filter } from "lucide-react";
import Navbar from "../components/navbar";
import { HashLoader } from "react-spinners";
import Pagination from "../components/Paginate";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Footer from "../components/footer";
import { formatCurrency } from "@/lib/formatcurrency";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ShopPage() {
  const { allproducts, loading, products } = useProducts();

  const productData = allproducts.length > 0 ? allproducts : products;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 25;

  const categories = useMemo(() => {
    return [...new Set(productData.map((p) => p.category))];
  }, [productData]);

  const filteredProducts = useMemo(() => {
    let filtered = [...productData];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (sortOption === "low-high") {
      filtered = filtered.sort((a, b) => a.price_numeric - b.price_numeric);
      toast.success("Sorted by Price: Low to High");
    } else if (sortOption === "high-low") {
      filtered = filtered.sort((a, b) => b.price_numeric - a.price_numeric);
      toast.success("Sorted by Price: High to Low");
    }

    return filtered;
  }, [productData, selectedCategories, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (category) => {
  setSelectedCategories((prev) => {
    if (prev.includes(category)) {
      // remove filter
      toast.error(`Category filter removed: ${category}`);
      return prev.filter((c) => c !== category);
    } else {
      // add filter
      toast.success(`Category filter applied: ${category}`);
      return [...prev, category];
    }
  });
  setCurrentPage(1);
};


  return (
    <>
      <Navbar />

      <div className="main-container mt-30 py-10 font-sans px-4 sm:px-6 lg:px-8">
        


<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
      </BreadcrumbItem>

      {/* Show categories in breadcrumb when filter is applied */}
      {selectedCategories.map((cat, index) => (
        <div key={cat} className="flex items-center">
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryChange(cat); // apply filter toggle
              }}
              className="text-[#365a41] hover:underline"
            >
              {cat}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </div>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block bg-white shadow rounded-md p-5 h-fit max-h-[80vh] overflow-y-auto sticky top-40">
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
                    className="accent-[#365a41] cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">{cat}</span>
                </label>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div>
              <h3 className="text-sm font-medium mb-2">Sort By</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-sm font-normal"
                  >
                    {sortOption === "low-high"
                      ? "Price: Low to High"
                      : sortOption === "high-low"
                      ? "Price: High to Low"
                      : "Default"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-full font-sans">
                  <DropdownMenuItem onClick={() => setSortOption("")}>
                    Default
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("low-high")}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("high-low")}>
                    Price: High to Low
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4 font-sans ">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Filter size={18} /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 sm:w-96 pl-4">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-6 cursor-pointer">
                  {/* Categories */}
                  <div>
  <h3 className="text-sm font-medium mb-2">Categories</h3>
  {categories.map((cat) => ( 
    <label
      key={cat}
      className="flex items-center space-x-2 mb-2 cursor-pointer"
    >
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


                  {/* Sort Dropdown */}
                  <div className="mr-4">
                    <h3 className="text-sm font-medium mb-2">Sort By</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between text-sm font-normal mr-2"
                        >
                          {sortOption === "low-high"
                            ? "Price: Low to High"
                            : sortOption === "high-low"
                            ? "Price: High to Low"
                            : "Default"}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-full font-sans">
                        <DropdownMenuItem onClick={() => setSortOption("")}>
                          Default
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption("low-high")}>
                          Price: Low to High
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption("high-low")}>
                          Price: High to Low
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
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
                        <div className="group hover:scale-105 hover:-translate-y-2 duration-500 bg-white rounded-sm shadow-md h-90 overflow-hidden transition hover:shadow-lg cursor-pointer">
                          {/* Product Image */}
                          <div className="w-full h-56 sm:h-60 overflow-hidden relative">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
                              {product.title}
                            </p>
                            <p className="mt-3 font-sans text-xl font-bold text-[#365a41]">
                              ${formatCurrency(product.price_numeric)}
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
                  <Pagination
                    pageCount={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Top pe scroll karega
  }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
