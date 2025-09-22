"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState("USD");
  const [eurRate, setEurRate] = useState(0.93); // fallback default EUR rate

  // ✅ Fetch dynamic EUR rate
  useEffect(() => {
    async function fetchEurRate() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        if (data.result === "success" && data.rates?.EUR) {
          setEurRate(data.rates.EUR);
          console.log("EUR Rate updated:", data.rates.EUR);
        }
      } catch (error) {
        console.error("Error fetching EUR rate:", error);
      }
    }
    fetchEurRate();
  }, []);


  useEffect(() => {
    console.log('erur', eurRate);
    
  }, [eurRate])
    

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
      rate: currency === "USD" ? 1 : eurRate, // USD=1, EUR=dynamic
    }),
    [currency, eurRate]
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
