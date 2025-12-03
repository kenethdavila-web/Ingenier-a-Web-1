import { useState, useMemo } from "react";
import { credits as initialCredits } from "../data/creditsData";

export default function useCredits() {
  const [query, setQuery] = useState("");
  const [minRange, setMinRange] = useState(null);
  const [maxRange, setMaxRange] = useState(null);
  const [sortBy, setSortBy] = useState("");

  // FILTRO PRINCIPAL
  const filtered = useMemo(() => {
    let list = [...initialCredits];

    // -------------- FILTRO POR TEXTO ----------------
    if (query.trim()) {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // -------------- FILTRO POR RANGO ----------------
    if (minRange !== null && maxRange !== null) {
      list = list.filter(
        (c) => c.min >= minRange && c.max <= maxRange
      );
    }

    // -------------- ORDENAMIENTO ----------------
    if (sortBy === "rate") list.sort((a, b) => a.rateMonthly - b.rateMonthly);

    if (sortBy === "min") list.sort((a, b) => a.min - b.min);

    return list;
  }, [query, minRange, maxRange, sortBy]);

  return {
    credits: filtered,
    query,
    setQuery,
    minRange,
    setMinRange,
    maxRange,
    setMaxRange,
    sortBy,
    setSortBy
  };
}

