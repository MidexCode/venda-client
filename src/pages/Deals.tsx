import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { HiLightningBolt } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { HiStar } from "react-icons/hi";
import api from "../lib/api";
import useCartStore from "../store/cartStore";
import type { Product } from "../types";
import toast from "react-hot-toast";

const dealCategories = [
  { label: "All deals", slug: "" },
  { label: "Electronics", slug: "electronics" },
  { label: "Phones", slug: "phones" },
  { label: "Fashion", slug: "fashion" },
  { label: "Sports", slug: "sports" },
  { label: "Beauty", slug: "beauty" },
];

const useCountdown = () => {
  const [time, setTime] = useState({ hours: 8, minutes: 34, seconds: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};

const TimerBox = ({ value, label }: { value: number; label: string }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.07)",
      border: "0.5px solid rgba(255,255,255,0.12)",
      borderRadius: "10px",
      padding: "12px 16px",
      textAlign: "center",
      minWidth: "70px",
    }}
  >
    <div
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "28px",
        fontWeight: 700,
        color: "#C9A84C",
        lineHeight: 1,
      }}
    >
      {String(value).padStart(2, "0")}
    </div>
    <div
      style={{
        fontSize: "10px",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginTop: "4px",
      }}
    >
      {label}
    </div>
  </div>
);

const getDiscount = (product: Product): number => {
  if (!product.comparePrice || product.comparePrice <= product.price) return 0;
  return Math.round(
    ((Number(product.comparePrice) - Number(product.price)) /
      Number(product.comparePrice)) *
      100,
  );
};

const getStockPercentage = (stock: number): number => {
  const maxStock = 50;
  const sold = Math.max(0, maxStock - stock);
  return Math.min(Math.round((sold / maxStock) * 100), 99);
};

const DealCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const discount = getDiscount(product);
  const stockPct = getStockPercentage(product.stock);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      quantity: 1,
      product,
    });
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: "#0A1628",
        color: "#C9A84C",
        border: "0.5px solid rgba(201,168,76,0.3)",
        borderRadius: "10px",
        fontSize: "13px",
      },
    });
  };

  return (
    <div
      onClick={() =>
        navigate({ to: "/products/$slug", params: { slug: product.slug } })
      }
      style={{
        background: "#fff",
        border: "0.5px solid #E5E2DC",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(10,22,40,0.1)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          height: "180px",
          background: "#0A1628",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "48px",
              fontWeight: 700,
              color: "rgba(201,168,76,0.2)",
            }}
          >
            V
          </span>
        )}

        {discount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "#993C1D",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 500,
              padding: "3px 10px",
              borderRadius: "20px",
            }}
          >
            -{discount}%
          </span>
        )}

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "rgba(10,22,40,0.75)",
            backdropFilter: "blur(4px)",
            borderRadius: "6px",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <HiLightningBolt style={{ color: "#C9A84C", fontSize: "11px" }} />
          <span style={{ fontSize: "10px", color: "#fff", fontWeight: 500 }}>
            Flash deal
          </span>
        </div>
      </div>

      <div style={{ padding: "12px" }}>
        <div
          style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "3px" }}
        >
          {product.seller?.storeName}
        </div>

        <div
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#0A1628",
            marginBottom: "5px",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "8px",
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <HiStar
              key={star}
              style={{
                fontSize: "11px",
                color:
                  star <= Math.round(product.rating) ? "#C9A84C" : "#D1D5DB",
              }}
            />
          ))}
          <span style={{ fontSize: "10px", color: "#9CA3AF" }}>
            ({product.reviewCount})
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div>
            <span
              style={{ fontSize: "15px", fontWeight: 500, color: "#0A1628" }}
            >
              ₦{Number(product.price).toLocaleString()}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span
                style={{
                  fontSize: "11px",
                  color: "#9CA3AF",
                  textDecoration: "line-through",
                  marginLeft: "5px",
                }}
              >
                ₦{Number(product.comparePrice).toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            style={{
              width: "28px",
              height: "28px",
              background: "#0A1628",
              border: "none",
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0A1628")}
          >
            <BsCart3 style={{ color: "#C9A84C", fontSize: "13px" }} />
          </button>
        </div>

        <div>
          <div
            style={{
              height: "5px",
              background: "#F5F4F0",
              borderRadius: "3px",
              overflow: "hidden",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${stockPct}%`,
                background:
                  stockPct > 75
                    ? "#993C1D"
                    : stockPct > 50
                      ? "#C9A84C"
                      : "#059669",
                borderRadius: "3px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <span style={{ fontSize: "10px", color: "#9CA3AF" }}>
            {stockPct}% claimed · {product.stock} left
          </span>
        </div>
      </div>
    </div>
  );
};

const DealCardSkeleton = () => (
  <div
    style={{
      background: "#fff",
      border: "0.5px solid #E5E2DC",
      borderRadius: "12px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: "180px",
        background: "#E5E2DC",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
    <div style={{ padding: "12px" }}>
      {[60, 85, 40, 100].map((w, i) => (
        <div
          key={i}
          style={{
            height: i === 3 ? "5px" : "12px",
            background: "#E5E2DC",
            borderRadius: "4px",
            width: `${w}%`,
            marginBottom: "8px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  </div>
);

const Deals = () => {
  const navigate = useNavigate();
  const { hours, minutes, seconds } = useCountdown();
  const [activeCategory, setActiveCategory] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["deals", activeCategory],
    queryFn: async () => {
      const params: Record<string, string> = { limit: "12" };
      if (activeCategory) params.category = activeCategory;
      const res = await api.get<{ success: boolean; products: Product[] }>(
        "/products",
        { params },
      );
      return res.data.products;
    },
  });

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "#0A1628",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "-100px",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col items-center text-center">
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "12px",
              }}
            >
              <HiLightningBolt style={{ color: "#C9A84C", fontSize: "16px" }} />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#C9A84C",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Limited time offers
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "10px",
              }}
              className="text-3xl sm:text-4xl"
            >
              Flash deals —{" "}
              <span style={{ color: "#C9A84C" }}>Up to 60% off</span>
            </h1>

            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "24px",
              }}
            >
              New deals drop every day. Don't miss out.
            </p>

            {/* Countdown */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "28px",
              }}
            >
              <TimerBox value={hours} label="hrs" />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "24px",
                  color: "#C9A84C",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                :
              </span>
              <TimerBox value={minutes} label="min" />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "24px",
                  color: "#C9A84C",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                :
              </span>
              <TimerBox value={seconds} label="sec" />
            </div>

            {/* Category filter */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {dealCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{
                    background:
                      activeCategory === cat.slug
                        ? "#C9A84C"
                        : "rgba(255,255,255,0.07)",
                    border: `0.5px solid ${activeCategory === cat.slug ? "#C9A84C" : "rgba(255,255,255,0.15)"}`,
                    borderRadius: "8px",
                    padding: "7px 16px",
                    fontSize: "12px",
                    color:
                      activeCategory === cat.slug
                        ? "#0A1628"
                        : "rgba(255,255,255,0.65)",
                    fontWeight: activeCategory === cat.slug ? 500 : 400,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              fontWeight: 600,
              color: "#0A1628",
            }}
          >
            {activeCategory
              ? `${dealCategories.find((c) => c.slug === activeCategory)?.label} deals`
              : "Today's deals"}
          </h2>
          <button
            onClick={() => navigate({ to: "/shop" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              color: "#C9A84C",
              fontWeight: 500,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            See all products <FiArrowRight size={12} />
          </button>
        </div>

        {/* Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <DealCardSkeleton key={i} />
              ))
            : data?.map((product) => (
                <DealCard key={product.id} product={product} />
              ))}
        </div>

        {!isLoading && (!data || data.length === 0) && (
          <div style={{ textAlign: "center", padding: "64px 0" }}>
            <HiLightningBolt
              style={{
                fontSize: "48px",
                color: "#D1D5DB",
                margin: "0 auto 12px",
                display: "block",
              }}
            />
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "18px",
                color: "#0A1628",
              }}
            >
              No deals in this category
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Deals;
