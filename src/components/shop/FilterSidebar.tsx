import { FiX } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";
import { HiStar } from "react-icons/hi";

interface FilterState {
  categories: string[];
  minPrice: string;
  maxPrice: string;
  rating: number | null;
  condition: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

const categories = [
  { label: "Phones", count: 567 },
  { label: "Fashion", count: 892 },
  { label: "Electronics", count: 1204 },
  { label: "Home", count: 340 },
  { label: "Food", count: 128 },
  { label: "Beauty", count: 234 },
  { label: "Sports", count: 189 },
  { label: "Books", count: 95 },
];

const ratings = [5, 4, 3];
const conditions = ["Brand new", "UK used", "Nigerian used"];

const CheckBox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    style={{
      width: "16px",
      height: "16px",
      background: checked ? "#0A1628" : "#fff",
      border: `0.5px solid ${checked ? "#0A1628" : "#D1D5DB"}`,
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
      transition: "all 0.15s",
    }}
  >
    {checked && <BsCheckLg style={{ color: "#C9A84C", fontSize: "9px" }} />}
  </button>
);

const FilterSidebar = ({ filters, onChange, onClear }: FilterSidebarProps) => {
  const toggleCategory = (cat: string) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: updated });
  };

  const toggleCondition = (cond: string) => {
    const updated = filters.condition.includes(cond)
      ? filters.condition.filter((c) => c !== cond)
      : [...filters.condition, cond];
    onChange({ ...filters, condition: updated });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.rating ||
    filters.condition.length > 0;

  return (
    <aside
      style={{
        background: "#fff",
        border: "0.5px solid #E5E2DC",
        borderRadius: "12px",
        padding: "16px",
        height: "fit-content",
        position: "sticky",
        top: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "0.5px solid #E5E2DC",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#0A1628",
          }}
        >
          Filters
        </span>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              color: "#993C1D",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <FiX size={12} />
            Clear all
          </button>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "#9CA3AF",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
          }}
        >
          Category
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {categories.map((cat) => (
            <div
              key={cat.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
              onClick={() => toggleCategory(cat.label)}
            >
              <CheckBox
                checked={filters.categories.includes(cat.label)}
                onChange={() => toggleCategory(cat.label)}
              />
              <span style={{ fontSize: "12px", color: "#374151", flex: 1 }}>
                {cat.label}
              </span>
              <span style={{ fontSize: "10px", color: "#9CA3AF" }}>
                {cat.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "#9CA3AF",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
          }}
        >
          Price range (₦)
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            style={{
              flex: 1,
              background: "#F5F4F0",
              border: "0.5px solid #E5E2DC",
              borderRadius: "6px",
              padding: "6px 10px",
              fontSize: "12px",
              color: "#0A1628",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none",
              width: "100%",
            }}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            style={{
              flex: 1,
              background: "#F5F4F0",
              border: "0.5px solid #E5E2DC",
              borderRadius: "6px",
              padding: "6px 10px",
              fontSize: "12px",
              color: "#0A1628",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none",
              width: "100%",
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "#9CA3AF",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
          }}
        >
          Minimum rating
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {ratings.map((r) => (
            <div
              key={r}
              onClick={() =>
                onChange({
                  ...filters,
                  rating: filters.rating === r ? null : r,
                })
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <CheckBox
                checked={filters.rating === r}
                onChange={() =>
                  onChange({
                    ...filters,
                    rating: filters.rating === r ? null : r,
                  })
                }
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <HiStar
                    key={star}
                    style={{
                      fontSize: "12px",
                      color: star <= r ? "#C9A84C" : "#D1D5DB",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "11px", color: "#6B7280" }}>& up</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "#9CA3AF",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
          }}
        >
          Condition
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {conditions.map((cond) => (
            <div
              key={cond}
              onClick={() => toggleCondition(cond)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <CheckBox
                checked={filters.condition.includes(cond)}
                onChange={() => toggleCondition(cond)}
              />
              <span style={{ fontSize: "12px", color: "#374151" }}>{cond}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
export type { FilterState };
