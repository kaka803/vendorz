"use client";
import { createContext, useContext, useState, useMemo } from "react";
import toast from "react-hot-toast";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  // Default USD
  const [currency, setCurrencyState] = useState("USD");

  // Rates relative to USD
  const rates = {
    USD: 1,
    EUR: 0.93, // approx, aap API se fetch bhi kar sakte ho
  };

  // Wrapper for setCurrency
  const setCurrency = (newCurrency) => {
    setCurrencyState(newCurrency);
    toast.success(
      `Currency changed to ${newCurrency === "USD" ? "US Dollar ($)" : "Euro (€)"}`,
      { duration: 2000 }
    );
  };

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      rate: rates[currency] || 1,
    }),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
