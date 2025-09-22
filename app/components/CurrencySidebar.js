"use client";
import { useCurrency } from "../context/CurrencyContext";
import { DollarSign, Euro } from "lucide-react"; // Currency icons

export default function CurrencySidebar() {
  const { currency, setCurrency } = useCurrency();

  const currencies = [
    { code: "USD", icon: <DollarSign size={20} /> },
    { code: "EUR", icon: <Euro size={20} /> },
  ];

  return (
    <div className="fixed top-1/2 right-4 -translate-y-1/2 flex flex-col gap-3 z-50">
      {currencies.map((c) => (
        <button
          key={c.code}
          onClick={() => setCurrency(c.code)}
          className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md 
          shadow-lg border-2 transition-all duration-300 transform hover:scale-110
          ${
            currency === c.code
              ? "bg-black text-white border-black shadow-2xl"
              : "bg-white/80 text-black border-gray-400 hover:shadow-xl"
          }`}
        >
          {c.icon}
        </button>
      ))}
    </div>
  );
}
