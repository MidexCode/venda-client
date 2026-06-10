import ProductCard from "../product/ProductCard";
import { BsShopWindow } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import type { Product } from "../../types";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const ProductCardSkeleton = () => (
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
      <div
        style={{
          height: "10px",
          background: "#E5E2DC",
          borderRadius: "4px",
          width: "60%",
          marginBottom: "8px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: "13px",
          background: "#E5E2DC",
          borderRadius: "4px",
          width: "85%",
          marginBottom: "8px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: "10px",
          background: "#E5E2DC",
          borderRadius: "4px",
          width: "40%",
          marginBottom: "12px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "16px",
            background: "#E5E2DC",
            borderRadius: "4px",
            width: "35%",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: "28px",
            height: "28px",
            background: "#E5E2DC",
            borderRadius: "6px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  </div>
);

const ProductGrid = ({ products, isLoading, isError }: ProductGridProps) => {
  if (isLoading) {
    return (
      <>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "64px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <AiOutlineLoading3Quarters
          style={{ fontSize: "40px", color: "#D1D5DB" }}
        />
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "18px",
            color: "#0A1628",
          }}
        >
          Failed to load products
        </p>
        <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
          Make sure your backend is running on port 5000
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "64px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <BsShopWindow style={{ fontSize: "48px", color: "#C9A84C" }} />
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "18px",
            color: "#0A1628",
          }}
        >
          No products found
        </p>
        <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default ProductGrid;
