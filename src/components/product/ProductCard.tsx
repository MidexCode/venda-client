import { useNavigate } from "@tanstack/react-router";
import { FiHeart } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { HiStar } from "react-icons/hi";
import useCartStore from "../../store/cartStore";
import type { Product } from "../../types";

const getBadge = (
  product: Product,
): { label: string; bg: string; color: string } | null => {
  if (product.isFeatured)
    return { label: "Featured", bg: "#0A1628", color: "#C9A84C" };
  if (product.comparePrice && product.comparePrice > product.price)
    return { label: "Sale", bg: "#C9A84C", color: "#0A1628" };
  return null;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <HiStar
        key={star}
        style={{
          fontSize: "11px",
          color: star <= Math.round(rating) ? "#C9A84C" : "#D1D5DB",
        }}
      />
    ))}
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const badge = getBadge(product);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      quantity: 1,
      product,
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

        {badge && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: badge.bg,
              color: badge.color,
              fontSize: "10px",
              fontWeight: 500,
              padding: "3px 10px",
              borderRadius: "20px",
            }}
          >
            {badge.label}
          </span>
        )}

        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "28px",
            height: "28px",
            background: "rgba(255,255,255,0.12)",
            border: "none",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
          }
        >
          <FiHeart style={{ color: "#fff", fontSize: "13px" }} />
        </button>
      </div>

      <div style={{ padding: "12px" }}>
        <div
          style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "3px" }}
        >
          {product.seller?.storeName ?? ""}
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
            gap: "5px",
            marginBottom: "8px",
          }}
        >
          <StarRating rating={product.rating} />
          <span style={{ fontSize: "10px", color: "#9CA3AF" }}>
            ({product.reviewCount})
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
            <span
              style={{ fontSize: "14px", fontWeight: 500, color: "#0A1628" }}
            >
              ₦{Number(product.price).toLocaleString()}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span
                style={{
                  fontSize: "11px",
                  color: "#9CA3AF",
                  textDecoration: "line-through",
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
            title="Add to cart"
          >
            <BsCart3 style={{ color: "#C9A84C", fontSize: "13px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
