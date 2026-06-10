/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { HiSparkles } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const suggestions = [
  "Phones under ₦50k",
  "Ankara dresses",
  "Laptops for students",
  "Nike sneakers",
];

const AISearchBar = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    navigate({ to: "/shop", search: { q: query } as any });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section style={{ background: "#F5F4F0" }} className="w-full py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            background: "#fff",
            border: "0.5px solid #E5E2DC",
            borderRadius: "14px",
            padding: "16px 20px",
            boxShadow: "0 2px 16px rgba(10,22,40,0.06)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#C9A84C",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <HiSparkles style={{ color: "#C9A84C", fontSize: "13px" }} />{" "}
            <span>Venda AI Search</span>
          </div>

          <div className="flex gap-3 items-center">
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#0A1628",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "18px",
              }}
            >
              <HiSparkles style={{ color: "#C9A84C", fontSize: "13px" }} />
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Ask anything — "affordable phones under ₦50k" or "best Ankara for weddings"'
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

            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                background: "#0A1628",
                color: "#C9A84C",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
                flexShrink: 0,
                opacity: loading ? 0.7 : 1,
                transition: "opacity 0.15s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters
                    style={{
                      fontSize: "13px",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Searching...
                </>
              ) : (
                <>
                  <FiSearch style={{ fontSize: "14px" }} />
                  Search
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <span
              style={{
                fontSize: "11px",
                color: "#9CA3AF",
                alignSelf: "center",
              }}
            >
              Try:
            </span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  navigate({ to: "/shop", search: { q: s } as any });
                }}
                style={{
                  background: "#F5F4F0",
                  border: "0.5px solid #E5E2DC",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontSize: "11px",
                  color: "#4B5563",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#C9A84C";
                  e.currentTarget.style.color = "#0A1628";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E5E2DC";
                  e.currentTarget.style.color = "#4B5563";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default AISearchBar;
