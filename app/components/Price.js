"use client";
import { useCurrency } from "../context/CurrencyContext";
import { formatCurrency } from "@/lib/formatcurrency";

export default function Price({ basePrice }) {
  const { currency, rate } = useCurrency();
  const converted = basePrice * rate;

  return (
    <span className="font-semibold">
      {formatCurrency(converted, currency)}
    </span>
  );
}