import { useState, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiSliders } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import api from "../lib/api";
import FilterSidebar from "../components/shop/FilterSidebar";
import ActiveFilters from "../components/shop/ActiveFilters";
import ProductGrid from "../components/shop/ProductGrid";
import ShopPagination from "../components/shop/ShopPagination";
import type { FilterState } from "../components/shop/FilterSidebar";
import type { Product } from "../types";

interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const defaultFilters: FilterState = {
  categories: [],
  minPrice: "",
  maxPrice: "",
  rating: null,
  condition: [],
};

const sortOptions = [
  { value: "createdAt", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to high" },
  { value: "price_desc", label: "Price: High to low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
];

const Shop = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/layout/shop" as never }) as {
    q?: string;
    category?: string;
    page?: string;
  };

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    categories: search.category ? [search.category] : [],
  });
  const [searchQuery, setSearchQuery] = useState(search.q ?? "");
  const [sort, setSort] = useState("createdAt");
  const [page, setPage] = useState(Number(search.page ?? 1));
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery, sort]);

  const fetchProducts = async (): Promise<ProductsResponse> => {
    const params: Record<string, string> = {
      page: String(page),
      limit: "12",
      sortBy: sort,
    };

    if (searchQuery) params.search = searchQuery;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.rating) params.rating = String(filters.rating);
    if (filters.categories.length === 1)
      params.category = filters.categories[0].toLowerCase();

    const res = await api.get<ProductsResponse>("/products", { params });
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shop-products", filters, searchQuery, sort, page],
    queryFn: fetchProducts,
    placeholderData: (prev) => prev,
  });

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery("");
    setPage(1);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate({ to: "/shop", search: { q: searchQuery } as never });
    }
  };

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "#0A1628",
              marginBottom: "4px",
            }}
          >
            Shop
          </h1>
          <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
            Discover thousands of products from verified Nigerian sellers
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: "200px",
              background: "#fff",
              border: "0.5px solid #E5E2DC",
              borderRadius: "10px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FiSearch
              style={{ color: "#9CA3AF", fontSize: "16px", flexShrink: 0 }}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "13px",
                color: "#0A1628",
                background: "transparent",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {isLoading && (
              <AiOutlineLoading3Quarters
                style={{
                  fontSize: "14px",
                  color: "#C9A84C",
                  animation: "spin 0.7s linear infinite",
                  flexShrink: 0,
                }}
              />
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              background: "#fff",
              border: "0.5px solid #E5E2DC",
              borderRadius: "10px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "#0A1628",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              outline: "none",
              minWidth: "160px",
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex lg:hidden"
            style={{
              background: "#0A1628",
              color: "#C9A84C",
              border: "none",
              borderRadius: "10px",
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FiSliders size={14} />
            Filters
          </button>
        </div>

        <ActiveFilters
          filters={filters}
          onChange={setFilters}
          onClear={handleClearFilters}
        />

        <div style={{ marginBottom: "16px" }}>
          <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
            {isLoading
              ? "Loading..."
              : `${(data?.pagination.total ?? 0).toLocaleString()} products found`}
          </span>
        </div>

        <div className="flex gap-6">
          <div
            className="hidden lg:block"
            style={{ width: "220px", flexShrink: 0 }}
          >
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onClear={handleClearFilters}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <ProductGrid
              products={data?.products ?? []}
              isLoading={isLoading}
              isError={isError}
            />
            <ShopPagination
              currentPage={page}
              totalPages={data?.pagination.totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {showMobileFilters && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
            }}
          >
            <div
              onClick={() => setShowMobileFilters(false)}
              style={{
                flex: 1,
                background: "rgba(10,22,40,0.5)",
              }}
            />

            <div
              style={{
                width: "280px",
                background: "#fff",
                height: "100%",
                overflowY: "auto",
                padding: "16px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#0A1628",
                  }}
                >
                  Filters
                </span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "#0A1628",
                  }}
                >
                  ×
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={(f) => {
                  setFilters(f);
                  setShowMobileFilters(false);
                }}
                onClear={() => {
                  handleClearFilters();
                  setShowMobileFilters(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Shop;
