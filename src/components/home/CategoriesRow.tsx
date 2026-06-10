/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  BsGrid,
  BsPhone,
  BsLaptop,
  BsHouseDoor,
  BsBook,
  BsCarFront,
} from "react-icons/bs";
import { MdCheckroom, MdFastfood, MdSportsSoccer } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";
import type { IconType } from "react-icons";

const categories: { label: string; icon: IconType; slug: string }[] = [
  { label: "All", icon: BsGrid, slug: "" },
  { label: "Phones", icon: BsPhone, slug: "phones" },
  { label: "Fashion", icon: MdCheckroom, slug: "fashion" },
  { label: "Electronics", icon: BsLaptop, slug: "electronics" },
  { label: "Home", icon: BsHouseDoor, slug: "home" },
  { label: "Food", icon: MdFastfood, slug: "food" },
  { label: "Beauty", icon: GiLipstick, slug: "beauty" },
  { label: "Sports", icon: MdSportsSoccer, slug: "sports" },
  { label: "Books", icon: BsBook, slug: "books" },
  { label: "Vehicles", icon: BsCarFront, slug: "vehicles" },
];

const CategoriesRow = () => {
  const [active, setActive] = useState("All");
  const navigate = useNavigate();

  const handleClick = (cat: (typeof categories)[0]) => {
    setActive(cat.label);
    navigate({ to: "/shop", search: { category: cat.slug } as any });
  };

  return (
    <section style={{ background: "#F5F4F0" }} className="w-full pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              fontWeight: 600,
              color: "#0A1628",
            }}
          >
            Shop by category
          </h2>
          <button
            onClick={() => navigate({ to: "/shop" })}
            style={{
              fontSize: "12px",
              color: "#C9A84C",
              fontWeight: 500,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            See all →
          </button>
        </div>

        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => {
            const isActive = active === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => handleClick(cat)}
                style={{
                  background: isActive ? "#0A1628" : "#fff",
                  border: `0.5px solid ${isActive ? "#0A1628" : "#E5E2DC"}`,
                  borderRadius: "12px",
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  flexShrink: 0,
                  minWidth: "80px",
                  transition: "all 0.15s",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#C9A84C";
                    e.currentTarget.style.background = "#FFFDF7";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#E5E2DC";
                    e.currentTarget.style.background = "#fff";
                  }
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: isActive ? "rgba(201,168,76,0.15)" : "#F5F4F0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <cat.icon
                    style={{
                      fontSize: "18px",
                      color: isActive ? "#C9A84C" : "#6B7280",
                    }}
                  />
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? "#C9A84C" : "#6B7280",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesRow;
