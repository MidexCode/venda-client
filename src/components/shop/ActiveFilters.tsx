import { FiX } from "react-icons/fi";
import type { FilterState } from "./FilterSidebar";

interface ActiveFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

const ActiveFilters = ({ filters, onChange, onClear }: ActiveFiltersProps) => {
  const chips: { label: string; onRemove: () => void }[] = [];

  filters.categories.forEach((cat) => {
    chips.push({
      label: cat,
      onRemove: () =>
        onChange({
          ...filters,
          categories: filters.categories.filter((c) => c !== cat),
        }),
    });
  });

  if (filters.minPrice) {
    chips.push({
      label: `Min ₦${Number(filters.minPrice).toLocaleString()}`,
      onRemove: () => onChange({ ...filters, minPrice: "" }),
    });
  }

  if (filters.maxPrice) {
    chips.push({
      label: `Max ₦${Number(filters.maxPrice).toLocaleString()}`,
      onRemove: () => onChange({ ...filters, maxPrice: "" }),
    });
  }

  if (filters.rating) {
    chips.push({
      label: `${filters.rating}★ & up`,
      onRemove: () => onChange({ ...filters, rating: null }),
    });
  }

  filters.condition.forEach((cond) => {
    chips.push({
      label: cond,
      onRemove: () =>
        onChange({
          ...filters,
          condition: filters.condition.filter((c) => c !== cond),
        }),
    });
  });

  if (chips.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "8px",
        marginBottom: "16px",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          color: "#9CA3AF",
          fontWeight: 500,
        }}
      >
        Active filters:
      </span>

      {chips.map((chip) => (
        <div
          key={chip.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "#0A1628",
            color: "#C9A84C",
            fontSize: "11px",
            fontWeight: 500,
            padding: "4px 10px",
            borderRadius: "20px",
          }}
        >
          <span>{chip.label}</span>
          <button
            onClick={chip.onRemove}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: 0,
              color: "#C9A84C",
            }}
          >
            <FiX size={11} />
          </button>
        </div>
      ))}

      <button
        onClick={onClear}
        style={{
          fontSize: "11px",
          color: "#993C1D",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          textDecoration: "underline",
        }}
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;
