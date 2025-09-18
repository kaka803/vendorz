"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [allproducts, setallproducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch products function
  const fetchProducts = async (
    page = 1,
    limit = 20,
    categories = [],
    sort = "",
    append = false // agar infinite scroll use karna ho
  ) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);
      if (categories.length > 0) params.append("categories", categories.join(","));
      if (sort) params.append("sort", sort);

      const response = await fetch(`/api/getproducts?${params.toString()}`);
      const data = await response.json();

      if (append) {
        setProducts((prev) => [...prev, ...data.products]);
      } else {
        setProducts(data.products);
      }

      setTotalProducts(data.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
  try {
    setLoading(true);

    // Limit ko bahut bada set karo, ya page/limit remove kar do
    const response = await fetch(`/api/getallproducts`); 
    const data = await response.json();

    setallproducts(data.products);
    setTotalProducts(data.total || 0);

  } catch (error) {
    console.error("Error fetching all products:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <ProductContext.Provider value={{ products, totalProducts, loading, fetchProducts, fetchAllProducts,allproducts, setallproducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
