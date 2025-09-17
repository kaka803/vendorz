"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // server API ko call karo
    const updateProducts = async () => {
      const res = await fetch("/api/updateProductIds");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    };

    updateProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
