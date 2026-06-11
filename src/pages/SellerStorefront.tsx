import { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MdVerified } from "react-icons/md";
import { HiStar } from "react-icons/hi";
import { FiArrowLeft, FiShare2 } from "react-icons/fi";
import { BsShopWindow, BsBoxSeam, BsPeopleFill } from "react-icons/bs";
import api from "../lib/api";
import ProductCard from "../components/product/ProductCard";
import type { Product, Seller } from "../types";

interface SellerResponse {
  success: boolean;
  data: Seller & {
    products: Product[];
  };
}

type Tab = "products" | "reviews" | "about";

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div
    style={{
      background: "#fff",
      border: "0.5px solid #E5E2DC",
      borderRadius: "10px",
      padding: "14px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        background: "rgba(10,22,40,0.06)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#0A1628",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>
        {label}
      </div>
    </div>
  </div>
);

const SellerStorefrontSkeleton = () => (
  <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
    <div
      style={{
        height: "180px",
        background: "#E5E2DC",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: "80px",
              background: "#E5E2DC",
              borderRadius: "10px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    </div>
    <style>{`
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    `}</style>
  </div>
);

const SellerStorefront = () => {
  const { slug } = useParams({ from: "/layout/sellers/$slug" as never });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("products");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["seller", slug],
    queryFn: async () => {
      const res = await api.get<SellerResponse>(`/sellers/${slug}`);
      return res.data.data;
    },
    enabled: !!slug,
  });

  if (isLoading) return <SellerStorefrontSkeleton />;

  if (isError || !data) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <BsShopWindow style={{ fontSize: "48px", color: "#D1D5DB" }} />
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            color: "#0A1628",
          }}
        >
          Store not found
        </p>
        <button
          onClick={() => navigate({ to: "/shop" })}
          style={{
            background: "#0A1628",
            color: "#C9A84C",
            border: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Back to shop
        </button>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "products", label: `Products (${data.products?.length ?? 0})` },
    { key: "reviews", label: "Reviews" },
    { key: "about", label: "About" },
  ];

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
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
            right: "-80px",
            top: "-80px",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ paddingTop: "20px", marginBottom: "20px" }}>
            <button
              onClick={() => navigate({ to: "/shop" })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                padding: 0,
              }}
            >
              <FiArrowLeft size={14} />
              Back to shop
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingBottom: "24px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-end", gap: "16px" }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  background: data.logoUrl ? "transparent" : "#C9A84C",
                  borderRadius: "14px",
                  border: "3px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "24px",
                  color: "#0A1628",
                  fontWeight: 700,
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                {data.logoUrl ? (
                  <img
                    src={data.logoUrl}
                    alt={data.storeName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  data.storeName.slice(0, 2).toUpperCase()
                )}
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <h1
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {data.storeName}
                  </h1>
                  {data.isVerified && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "rgba(201,168,76,0.15)",
                        border: "0.5px solid rgba(201,168,76,0.3)",
                        borderRadius: "20px",
                        padding: "2px 8px",
                      }}
                    >
                      <MdVerified
                        style={{ color: "#C9A84C", fontSize: "13px" }}
                      />
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#C9A84C",
                          fontWeight: 500,
                        }}
                      >
                        Verified seller
                      </span>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "6px",
                  }}
                >
                  <HiStar style={{ color: "#C9A84C", fontSize: "14px" }} />
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {data.rating.toFixed(1)} seller rating
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    ·
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {data.totalSales.toLocaleString()} sales
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  background: "#C9A84C",
                  color: "#0A1628",
                  border: "none",
                  padding: "9px 20px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Follow store
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FiShare2 size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <StatCard
            icon={<BsBoxSeam style={{ color: "#0A1628", fontSize: "18px" }} />}
            value={data.products?.length.toLocaleString() ?? "0"}
            label="Products"
          />
          <StatCard
            icon={<HiStar style={{ color: "#C9A84C", fontSize: "18px" }} />}
            value={data.rating.toFixed(1)}
            label="Seller rating"
          />
          <StatCard
            icon={
              <BsPeopleFill style={{ color: "#0A1628", fontSize: "18px" }} />
            }
            value={data.totalSales.toLocaleString()}
            label="Total sales"
          />
          <StatCard
            icon={<MdVerified style={{ color: "#C9A84C", fontSize: "18px" }} />}
            value={data.isVerified ? "Verified" : "Unverified"}
            label="Store status"
          />
        </div>

        <div
          style={{
            display: "flex",
            borderBottom: "0.5px solid #E5E2DC",
            marginBottom: "24px",
            gap: "0",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "12px 20px",
                fontSize: "13px",
                fontWeight: activeTab === tab.key ? 500 : 400,
                color: activeTab === tab.key ? "#0A1628" : "#9CA3AF",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.key ? "#C9A84C" : "transparent"}`,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
                marginBottom: "-0.5px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "products" && (
          <div style={{ paddingBottom: "48px" }}>
            {data.products?.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "64px 0",
                }}
              >
                <BsShopWindow
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
                  No products yet
                </p>
              </div>
            ) : (
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                }}
              >
                {data.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div
            style={{
              background: "#fff",
              border: "0.5px solid #E5E2DC",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            <HiStar
              style={{
                fontSize: "40px",
                color: "#C9A84C",
                margin: "0 auto 12px",
                display: "block",
              }}
            />
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "18px",
                color: "#0A1628",
                marginBottom: "4px",
              }}
            >
              {data.rating.toFixed(1)} overall rating
            </p>
            <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
              Based on {data.totalSales.toLocaleString()} completed orders
            </p>
          </div>
        )}

        {activeTab === "about" && (
          <div
            style={{
              background: "#fff",
              border: "0.5px solid #E5E2DC",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "48px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#0A1628",
                marginBottom: "12px",
              }}
            >
              About {data.storeName}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#6B7280",
                lineHeight: 1.7,
              }}
            >
              {data.description ?? "No description provided."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerStorefront;
