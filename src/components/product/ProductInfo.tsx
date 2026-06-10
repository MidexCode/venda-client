import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { HiStar } from "react-icons/hi";
import { FiShoppingCart, FiHeart, FiShare2 } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { BsShieldCheck, BsTruck } from "react-icons/bs";
import useCartStore from "../../store/cartStore";
import type { Product } from "../../types";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      variantId: selectedVariant ?? undefined,
      quantity,
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

  const handleBuyNow = () => {
    handleAddToCart();
    navigate({ to: "/cart" });
  };

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          ((Number(product.comparePrice) - Number(product.price)) /
            Number(product.comparePrice)) *
            100,
        )
      : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            fontSize: "11px",
            color: "#C9A84C",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {product.category.name}
        </span>
        {product.isFeatured && (
          <span
            style={{
              background: "#0A1628",
              color: "#C9A84C",
              fontSize: "10px",
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: "20px",
            }}
          >
            Featured
          </span>
        )}
        {discount && (
          <span
            style={{
              background: "#C9A84C",
              color: "#0A1628",
              fontSize: "10px",
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: "20px",
            }}
          >
            -{discount}% off
          </span>
        )}
      </div>

      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "26px",
          fontWeight: 700,
          color: "#0A1628",
          lineHeight: 1.2,
        }}
      >
        {product.name}
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <HiStar
              key={star}
              style={{
                fontSize: "16px",
                color:
                  star <= Math.round(product.rating) ? "#C9A84C" : "#D1D5DB",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#0A1628" }}>
          {product.rating.toFixed(1)}
        </span>
        <span style={{ fontSize: "13px", color: "#9CA3AF" }}>
          ({product.reviewCount} reviews)
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "#0A1628",
          }}
        >
          ₦{Number(product.price).toLocaleString()}
        </span>
        {product.comparePrice && product.comparePrice > product.price && (
          <span
            style={{
              fontSize: "18px",
              color: "#9CA3AF",
              textDecoration: "line-through",
            }}
          >
            ₦{Number(product.comparePrice).toLocaleString()}
          </span>
        )}
      </div>

      <div
        onClick={() =>
          navigate({
            to: "/sellers/$slug",
            params: { slug: product.seller.storeSlug },
          })
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#F5F4F0",
          border: "0.5px solid #E5E2DC",
          borderRadius: "10px",
          padding: "12px 14px",
          cursor: "pointer",
          transition: "border-color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E2DC")}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "#0A1628",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Playfair Display', serif",
            fontSize: "13px",
            color: "#C9A84C",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {product.seller.storeName.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#0A1628",
              }}
            >
              {product.seller.storeName}
            </span>
            <MdVerified style={{ color: "#C9A84C", fontSize: "14px" }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "2px",
            }}
          >
            <HiStar style={{ color: "#C9A84C", fontSize: "12px" }} />
            <span style={{ fontSize: "11px", color: "#6B7280" }}>
              {product.seller.rating.toFixed(1)} seller rating
            </span>
          </div>
        </div>
        <span style={{ fontSize: "11px", color: "#C9A84C", fontWeight: 500 }}>
          Visit store →
        </span>
      </div>

      {product.variants && product.variants.length > 0 && (
        <div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#0A1628",
              marginBottom: "8px",
            }}
          >
            Variants
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: `0.5px solid ${selectedVariant === variant.id ? "#0A1628" : "#E5E2DC"}`,
                  background:
                    selectedVariant === variant.id ? "#0A1628" : "#fff",
                  color: selectedVariant === variant.id ? "#C9A84C" : "#374151",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.15s",
                }}
              >
                {variant.value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "#0A1628",
            marginBottom: "8px",
          }}
        >
          Quantity
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
            background: "#F5F4F0",
            border: "0.5px solid #E5E2DC",
            borderRadius: "8px",
            width: "fit-content",
          }}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={{
              width: "36px",
              height: "36px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              color: "#0A1628",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            −
          </button>
          <span
            style={{
              minWidth: "40px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 500,
              color: "#0A1628",
            }}
          >
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            style={{
              width: "36px",
              height: "36px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              color: "#0A1628",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>
        <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "6px" }}>
          {product.stock} units available
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            background: "#0A1628",
            color: "#C9A84C",
            border: "none",
            padding: "13px 20px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <FiShoppingCart size={16} />
          Add to cart
        </button>

        <button
          onClick={handleBuyNow}
          style={{
            flex: 1,
            background: "#C9A84C",
            color: "#0A1628",
            border: "none",
            padding: "13px 20px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Buy now
        </button>

        <button
          style={{
            width: "46px",
            height: "46px",
            background: "#fff",
            border: "0.5px solid #E5E2DC",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "border-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E2DC")}
        >
          <FiHeart style={{ color: "#0A1628", fontSize: "16px" }} />
        </button>

        <button
          style={{
            width: "46px",
            height: "46px",
            background: "#fff",
            border: "0.5px solid #E5E2DC",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "border-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E2DC")}
        >
          <FiShare2 style={{ color: "#0A1628", fontSize: "16px" }} />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
        }}
      >
        {[
          {
            icon: (
              <BsShieldCheck style={{ color: "#C9A84C", fontSize: "16px" }} />
            ),
            text: "Secure payment via Paystack",
          },
          {
            icon: <BsTruck style={{ color: "#C9A84C", fontSize: "16px" }} />,
            text: "Fast delivery nationwide",
          },
        ].map((badge) => (
          <div
            key={badge.text}
            style={{
              background: "#F5F4F0",
              border: "0.5px solid #E5E2DC",
              borderRadius: "8px",
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {badge.icon}
            <span
              style={{ fontSize: "11px", color: "#6B7280", lineHeight: 1.4 }}
            >
              {badge.text}
            </span>
          </div>
        ))}
      </div>

      <div>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#0A1628",
            marginBottom: "8px",
          }}
        >
          Description
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "#6B7280",
            lineHeight: 1.7,
          }}
        >
          {product.description}
        </p>
      </div>

      {product.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {product.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#F5F4F0",
                border: "0.5px solid #E5E2DC",
                borderRadius: "20px",
                padding: "3px 10px",
                fontSize: "11px",
                color: "#6B7280",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
