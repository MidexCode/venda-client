import { useParams, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FiArrowLeft } from "react-icons/fi";
import api from "../lib/api";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";
import type { Product } from "../types";

const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div
        style={{
          aspectRatio: "1",
          background: "#E5E2DC",
          borderRadius: "14px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[80, 60, 40, 100, 60].map((w, i) => (
          <div
            key={i}
            style={{
              height: i === 0 ? "32px" : "16px",
              background: "#E5E2DC",
              borderRadius: "6px",
              width: `${w}%`,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    </div>
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams({ from: "/layout/products/$slug" as never });
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; data: Product }>(
        `/products/${slug}`,
      );
      return res.data.data;
    },
    enabled: !!slug,
  });

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError || !product) {
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
        <span style={{ fontSize: "48px" }}>😕</span>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            color: "#0A1628",
          }}
        >
          Product not found
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

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => navigate({ to: "/shop" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "13px",
              color: "#6B7280",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif',",
              padding: 0,
            }}
          >
            <FiArrowLeft size={14} />
            Shop
          </button>
          <span style={{ color: "#D1D5DB" }}>/</span>
          <span style={{ fontSize: "13px", color: "#6B7280" }}>
            {product.category.name}
          </span>
          <span style={{ color: "#D1D5DB" }}>/</span>
          <span
            style={{
              fontSize: "13px",
              color: "#0A1628",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "200px",
            }}
          >
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <ProductImageGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <div style={{ marginBottom: "64px" }}>
          <ProductReviews
            productId={product.id}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        <RelatedProducts
          categorySlug={product.category.slug}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
