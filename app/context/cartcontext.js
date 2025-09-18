"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // LocalStorage se load karna
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Jab bhi cart update ho, localStorage mai save ho jaye
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // ✅ Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product._id);
      if (exist) {
        return prev.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
          );
          
      } else {
        return [
          ...prev,
          {
            id: product._id,
            title: product.title,
            price: product.price_numeric,
            image: product.images?.[0] || "",
            quantity: 1,
          },
        ];
      }
    });
    alert('updated Cart')
  };

  // ✅ Remove from cart
 const removeFromCart = (id) => {
  setCart((prev) => {
    const updatedCart = prev.filter((item) => item.id !== id);
    // localStorage update karo
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  });
};

  // ✅ Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => setCart([]);

  // ✅ Subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );



  // ✅ Total
  const total = subtotal

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook shortcut
export const useCart = () => useContext(CartContext);
