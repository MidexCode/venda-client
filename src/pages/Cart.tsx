import { useNavigate } from "@tanstack/react-router";
import { BsCart3, BsShieldCheck, BsTrash } from "react-icons/bs";
import { FiMinus, FiPlus, FiArrowRight } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";
import useCartStore from "../store/cartStore";
import type { CartItem } from "../types";
import toast from "react-hot-toast";

const DELIVERY_FEE = 1500;

const CartItemCard = ({ item }: { item: CartItem }) => {
  const navigate = useNavigate();
  const { updateQuantity, removeItem } = useCartStore();

  const handleRemove = () => {
    removeItem(item.id);
    toast.success("Item removed from cart", {
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
      style={{
        background: "#fff",
        border: "0.5px solid #E5E2DC",
        borderRadius: "12px",
        padding: "14px",
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
      }}
    >
      <div
        onClick={() =>
          navigate({
            to: "/products/$slug",
            params: { slug: item.product.slug },
          })
        }
        style={{
          width: "80px",
          height: "80px",
          background: "#0A1628",
          borderRadius: "10px",
          overflow: "hidden",
          flexShrink: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.product.images.length > 0 ? (
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "rgba(201,168,76,0.3)",
            }}
          >
            V
          </span>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "2px" }}
        >
          {item.product.seller?.storeName}
        </div>
        <div
          onClick={() =>
            navigate({
              to: "/products/$slug",
              params: { slug: item.product.slug },
            })
          }
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#0A1628",
            marginBottom: "8px",
            lineHeight: 1.3,
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.product.name}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#F5F4F0",
              border: "0.5px solid #E5E2DC",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() =>
                updateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              style={{
                width: "32px",
                height: "32px",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0A1628",
              }}
            >
              <FiMinus size={12} />
            </button>
            <span
              style={{
                minWidth: "32px",
                textAlign: "center",
                fontSize: "13px",
                fontWeight: 500,
                color: "#0A1628",
              }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  Math.min(item.product.stock, item.quantity + 1),
                )
              }
              style={{
                width: "32px",
                height: "32px",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0A1628",
              }}
            >
              <FiPlus size={12} />
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#0A1628",
              }}
            >
              ₦{(Number(item.product.price) * item.quantity).toLocaleString()}
            </span>
            <button
              onClick={handleRemove}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9CA3AF",
                display: "flex",
                alignItems: "center",
                padding: "4px",
                borderRadius: "6px",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#993C1D")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
            >
              <BsTrash size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const { items, clearCart, total } = useCartStore();
  const subtotal = total();
  const grandTotal = subtotal + (items.length > 0 ? DELIVERY_FEE : 0);

  if (items.length === 0) {
    return (
      <div
        style={{
          background: "#F5F4F0",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "#fff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "0.5px solid #E5E2DC",
          }}
        >
          <BsCart3 style={{ fontSize: "36px", color: "#D1D5DB" }} />
        </div>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 700,
            color: "#0A1628",
          }}
        >
          Your cart is empty
        </p>
        <p style={{ fontSize: "14px", color: "#9CA3AF", textAlign: "center" }}>
          Looks like you haven't added anything yet
        </p>
        <button
          onClick={() => navigate({ to: "/shop" })}
          style={{
            background: "#0A1628",
            color: "#C9A84C",
            border: "none",
            padding: "12px 28px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Start shopping <FiArrowRight size={14} />
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
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#0A1628",
                marginBottom: "4px",
              }}
            >
              Your cart
            </h1>
            <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={() => {
              clearCart();
              toast.success("Cart cleared");
            }}
            style={{
              fontSize: "12px",
              color: "#993C1D",
              background: "none",
              border: "0.5px solid #FECACA",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <BsTrash size={12} />
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-2"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {items.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}

            <button
              onClick={() => navigate({ to: "/shop" })}
              style={{
                background: "transparent",
                border: "0.5px solid #E5E2DC",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "13px",
                color: "#6B7280",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#C9A84C")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E5E2DC")
              }
            >
              ← Continue shopping
            </button>
          </div>

          <div style={{ height: "fit-content" }}>
            <div
              style={{
                background: "#fff",
                border: "0.5px solid #E5E2DC",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "12px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#0A1628",
                  marginBottom: "16px",
                  paddingBottom: "12px",
                  borderBottom: "0.5px solid #E5E2DC",
                }}
              >
                Order summary
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>
                    Subtotal ({items.length} items)
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#0A1628",
                    }}
                  >
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>
                    Delivery fee
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#0A1628",
                    }}
                  >
                    ₦{DELIVERY_FEE.toLocaleString()}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <input
                  placeholder="Promo code"
                  style={{
                    flex: 1,
                    background: "#F5F4F0",
                    border: "0.5px solid #E5E2DC",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "#0A1628",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    background: "#0A1628",
                    color: "#C9A84C",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  Apply
                </button>
              </div>

              <div
                style={{
                  borderTop: "0.5px solid #E5E2DC",
                  paddingTop: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#0A1628",
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#0A1628",
                    }}
                  >
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate({ to: "/checkout" })}
                style={{
                  width: "100%",
                  background: "#0A1628",
                  color: "#C9A84C",
                  border: "none",
                  padding: "13px",
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
                  marginBottom: "10px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Proceed to checkout
                <FiArrowRight size={14} />
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <BsShieldCheck style={{ color: "#9CA3AF", fontSize: "13px" }} />
                <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
                  Secured by Paystack
                </span>
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                border: "0.5px solid #E5E2DC",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <MdLocalShipping
                  style={{ color: "#C9A84C", fontSize: "18px" }}
                />
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#0A1628",
                  }}
                >
                  Delivery info
                </span>
              </div>
              <p
                style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.6 }}
              >
                Standard delivery: 2–5 business days across Nigeria. Express
                delivery available at checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
