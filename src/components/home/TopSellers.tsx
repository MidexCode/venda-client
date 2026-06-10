import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { MdVerified } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { HiStar } from "react-icons/hi";
import api from "../../lib/api";
import type { Seller } from "../../types";

interface SellerWithProducts extends Seller {
  products: { id: string }[];
}

const fetchTopSellers = async (): Promise<SellerWithProducts[]> => {
  const res = await api.get<{ success: boolean; data: SellerWithProducts[] }>(
    "/sellers/top",
  );
  return res.data.data;
};

const mockSellers = [
  {
    id: "1",
    storeName: "TechHub Lagos",
    storeSlug: "techhub-lagos",
    rating: 4.9,
    totalSales: 8200,
    isVerified: true,
    products: Array(1204),
  },
  {
    id: "2",
    storeName: "Ankara House",
    storeSlug: "ankara-house",
    rating: 4.8,
    totalSales: 3400,
    isVerified: true,
    products: Array(342),
  },
  {
    id: "3",
    storeName: "Sneaker Republic",
    storeSlug: "sneaker-republic",
    rating: 4.7,
    totalSales: 1200,
    isVerified: true,
    products: Array(89),
  },
  {
    id: "4",
    storeName: "GadgetZone NG",
    storeSlug: "gadgetzone-ng",
    rating: 4.6,
    totalSales: 5600,
    isVerified: false,
    products: Array(567),
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const SellerCard = ({ seller }: { seller: (typeof mockSellers)[0] }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate({ to: "/sellers/$slug", params: { slug: seller.storeSlug } })
      }
      style={{
        background: "#fff",
        border: "0.5px solid #E5E2DC",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(10,22,40,0.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          background: "#0A1628",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Playfair Display', serif",
          fontSize: "15px",
          color: "#C9A84C",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {getInitials(seller.storeName)}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "2px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#0A1628",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {seller.storeName}
          </span>
          {seller.isVerified && (
            <MdVerified
              style={{ color: "#C9A84C", fontSize: "14px", flexShrink: 0 }}
            />
          )}
        </div>

        <div
          style={{
            fontSize: "11px",
            color: "#9CA3AF",
            marginBottom: "6px",
          }}
        >
          {seller.products.length.toLocaleString()} products ·{" "}
          {seller.totalSales.toLocaleString()} sales
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <HiStar style={{ color: "#C9A84C", fontSize: "12px" }} />
          <span style={{ fontSize: "11px", fontWeight: 500, color: "#0A1628" }}>
            {seller.rating.toFixed(1)}
          </span>
          <span style={{ fontSize: "11px", color: "#9CA3AF" }}>rating</span>
        </div>
      </div>

      <FiArrowRight
        style={{ color: "#D1D5DB", fontSize: "16px", flexShrink: 0 }}
      />
    </div>
  );
};

const SellerCardSkeleton = () => (
  <div
    style={{
      background: "#fff",
      border: "0.5px solid #E5E2DC",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}
  >
    <div
      style={{
        width: "44px",
        height: "44px",
        background: "#E5E2DC",
        borderRadius: "10px",
        flexShrink: 0,
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
    <div style={{ flex: 1 }}>
      <div
        style={{
          height: "13px",
          background: "#E5E2DC",
          borderRadius: "4px",
          width: "60%",
          marginBottom: "6px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: "11px",
          background: "#E5E2DC",
          borderRadius: "4px",
          width: "80%",
          marginBottom: "6px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: "11px",
          background: "#E5E2DC",
          borderRadius: "4px",
          width: "40%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    </div>
  </div>
);

const TopSellers = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["top-sellers"],
    queryFn: fetchTopSellers,
    retry: false,
  });

  const sellers = data ?? mockSellers;

  return (
    <section style={{ background: "#F5F4F0" }} className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#0A1628",
                marginBottom: "4px",
              }}
            >
              Top sellers
            </h2>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>
              Verified stores with thousands of happy customers
            </p>
          </div>
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
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            See all <FiArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <SellerCardSkeleton key={i} />
              ))
            : sellers.map((seller) => (
                <SellerCard key={seller.id} seller={seller} />
              ))}
        </div>

        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => navigate({ to: "/become-seller" })}
            style={{
              background: "transparent",
              border: "0.5px solid #0A1628",
              color: "#0A1628",
              padding: "10px 28px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0A1628";
              e.currentTarget.style.color = "#C9A84C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#0A1628";
            }}
          >
            Open your own store on Venda
            <FiArrowRight size={13} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default TopSellers;
