"use client";
import { useState, useMemo } from "react";
import { useProducts } from "../context/productcontext";
import Link from "next/link";
import { ShoppingCart, ChevronDown, Filter } from "lucide-react";
import Navbar from "../components/navbar";
import { HashLoader } from "react-spinners";
import Pagination from "../components/Paginate";
import CurrencySidebar from "../components/CurrencySidebar";
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
import { Slider } from "@/components/ui/slider";
import Price from "../components/Price";
import { useCart } from "../context/cartcontext";

export default function ShopPage() {
  const { allproducts, loading, products } = useProducts();
  const {addToCart} = useCart()
  const productData = allproducts.length > 0 ? allproducts : products;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedExtensions, setSelectedExtensions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]); // adjust max based on data
  const [polygonRange, setPolygonRange] = useState([0, 1000]);
  const [verticesRange, setVerticesRange] = useState([0, 1000]);
  const [texturedOnly, setTexturedOnly] = useState(false);
  const [riggedOnly, setRiggedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 25;

  // Unique filter values
  const categories = useMemo(() => {
    return [...new Set(productData.map((p) => p.category))];
  }, [productData]);

  const extensions = useMemo(() => {
    return [...new Set(productData.flatMap((p) => p.file_formats || []))];
  }, [productData]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let filtered = [...productData];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (selectedExtensions.length > 0) {
      filtered = filtered.filter((p) =>
        (p.extensions || []).some((ext) => selectedExtensions.includes(ext))
      );
    }

    filtered = filtered.filter(
      (p) =>
        p.price_numeric >= priceRange[0] &&
        p.price_numeric <= priceRange[1] &&
        (p.polygonCount || 0) >= polygonRange[0] &&
        (p.polygonCount || 0) <= polygonRange[1] &&
        (p.vertices || 0) >= verticesRange[0] &&
        (p.vertices || 0) <= verticesRange[1]
    );

    if (texturedOnly) {
      filtered = filtered.filter((p) => p.textured === true);
    }

    if (riggedOnly) {
      filtered = filtered.filter((p) => p.rigged === true);
    }

    if (sortOption === "low-high") {
      filtered = filtered.sort((a, b) => a.price_numeric - b.price_numeric);
    } else if (sortOption === "high-low") {
      filtered = filtered.sort((a, b) => b.price_numeric - a.price_numeric);
    }

    return filtered;
  }, [
    productData,
    selectedCategories,
    selectedExtensions,
    priceRange,
    polygonRange,
    verticesRange,
    texturedOnly,
    riggedOnly,
    sortOption,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Toggle handlers
 const handleCategoryChange = (category) => {
  setSelectedCategories((prev) => {
    if (prev.includes(category)) {
      toast(`Removed category: ${category}`);
      return prev.filter((c) => c !== category);
    } else {
      toast.success(`Added category: ${category}`);
      return [...prev, category];
    }
  });
  setCurrentPage(1);
};

const handleExtensionChange = (ext) => {
  setSelectedExtensions((prev) => {
    if (prev.includes(ext)) {
      toast(`Removed extension: .${ext}`);
      return prev.filter((e) => e !== ext);
    } else {
      toast.success(`Added extension: .${ext}`);
      return [...prev, ext];
    }
  });
  setCurrentPage(1);
};

function handleFilterChange(type, value, setter) {
  setter(value);
  toast.success(
    `${type} filter ${value ? "enabled" : "disabled"}`
  );
}

  return (
    <>
    <CurrencySidebar />
      <Navbar />

      <div className="main-container  mt-30 py-10 font-sans  sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto  mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className={'text-white hover:text-white/70'}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/shop" className={'text-white hover:text-white/70'}>Shop</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar + Filter button */} 
<div className="lg:col-span-1">
  {/* Mobile Filter Button */}
  <div className="lg:hidden mb-4">
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
        <Filter size={16} />
        Filters
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-80 h-screen p-0 flex flex-col">
      {/* Header fixed top */}
      <SheetHeader className="p-4 border-b">
        <SheetTitle>Filters</SheetTitle>
      </SheetHeader>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-800">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="accent-black cursor-pointer"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* File Extensions */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-800">
              File Extensions
            </h3>
            <div className="space-y-2">
              {extensions.map((ext) => (
                <label
                  key={ext}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedExtensions.includes(ext)}
                    onChange={() => handleExtensionChange(ext)}
                    className="accent-black cursor-pointer"
                  />
                  .{ext}
                </label>
              ))}
            </div>
          </div>
          <div>
  <h3 className="text-sm font-medium mb-2 text-gray-800">
    Sort by Price
  </h3>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className="w-full justify-between"
      >
        {sortOption === "low-high"
          ? "Price: Low to High"
          : sortOption === "high-low"
          ? "Price: High to Low"
          : "Select"}
        <ChevronDown size={16} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => setSortOption("low-high")}>
        Low to High
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setSortOption("high-low")}>
        High to Low
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>

          {/* Boolean Filters */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600 hover:text-black cursor-pointer">
              <input
                type="checkbox"
                checked={texturedOnly}
                onChange={(e) =>
                  handleFilterChange("Textured", e.target.checked, setTexturedOnly)
                }
                className="accent-black cursor-pointer"
              />
              Textured Only
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-600 hover:text-black cursor-pointer">
              <input
                type="checkbox"
                checked={riggedOnly}
                onChange={(e) =>
                  handleFilterChange("Rigged", e.target.checked, setRiggedOnly)
                }
                className="accent-black cursor-pointer"
              />
              Rigged Only
            </label>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</div>


  {/* Desktop Sidebar */}
  <aside className="hidden lg:block bg-black white-border shadow rounded-md p-5 h-fit">
    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold">Filters</h2>
    </div>

    <div className="px-5 py-4 space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-white/90">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="accent-black cursor-pointer"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* File Extensions */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-white/90">File Extensions</h3>
        <div className="space-y-2">
          {extensions.map((ext) => (
            <label
              key={ext}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedExtensions.includes(ext)}
                onChange={() => handleExtensionChange(ext)}
                className="accent-black cursor-pointer"
              />
              {ext}
            </label>
          ))}
        </div>
      </div>

<div>
  <h3 className="text-sm font-medium mb-2 text-white/90">
    Sort by Price
  </h3>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className="w-full justify-between bg-black hover:bg-white/80"
      >
        {sortOption === "low-high"
          ? "Price: Low to High"
          : sortOption === "high-low"
          ? "Price: High to Low"
          : "Select"}
        <ChevronDown size={16} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => setSortOption("low-high")}>
        Low to High
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setSortOption("high-low")}>
        High to Low
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
      {/* Boolean Filters */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-white/70 hover:text-white cursor-pointer">
          <input
            type="checkbox"
            checked={texturedOnly}
            onChange={(e) =>
              handleFilterChange("Textured", e.target.checked, setTexturedOnly)
            }
            className="accent-black cursor-pointer"
          />
          Textured Only
        </label>

        <label className="flex items-center gap-2 text-sm text-white/70 hover:text-white cursor-pointer">
          <input
            type="checkbox"
            checked={riggedOnly}
            onChange={(e) =>
              handleFilterChange("Rigged", e.target.checked, setRiggedOnly)
            }
            className="accent-black cursor-pointer"
          />
          Rigged Only
        </label>
      </div>
    </div>
  </aside>
</div>



          {/* Product Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-full w-full">
                <HashLoader size={50} color="#000" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      
                         <div className="group overflow-hidden  rounded-2xl my-2 white-border shadow-md hover:shadow-lg transition-all duration-300 max-md:w-full w-[260px] h-85 mx-auto flex flex-col">
                                      
                                      
                        
                                      {/* Product Image */}
                                      <div className="relative w-full h-44 flex items-center justify-center p-4">
                                        <img
                                          src={product.images[0]}
                                          alt={product.name}
                                          className="max-h-full max-w-full object-contain"
                                        />
                                      </div>
                        
                                      {/* Card Content */}
                                      <div className="flex flex-col flex-grow px-4 pb-4">
                                        <h3 className="text-base exo font-semibold text-gray-900 truncate">
                                          {product.name}
                                        </h3>
                                        <p className="text-sm exo text-white mt-1 line-clamp-2">
                                          {product.title}
                                        </p>
                        
                                        {/* Price */}
                                        <p className="text-lg exo font-bold text-[white] mt-2">
                                          <Price basePrice={product.price_numeric} />
                                        </p>
                        
                                        {/* Buttons */}
                                        <div className="mt-3 flex gap-2">
                          {/* Add to cart button */}
                          <button
                            onClick={() => addToCart(product)}
                            className="flex-1 flex items-center justify-center gap-1 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                          >
                            <ShoppingCart size={16} />
                            Add
                          </button>
                        
                          {/* Link styled like a button */}
                          <Link
                            href={`/product/${product._id}`}
                            className="flex-1 white-border text-white text-sm font-semibold px-3 py-2 rounded-lg  transition flex items-center justify-center"
                          >
                            Buy
                          </Link>
                        </div>
                        
                                      </div>
                                    </div>
                     
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
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
