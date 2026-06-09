import { useNavigate } from "@tanstack/react-router";

const miniProducts = [
  {
    emoji: "📱",
    name: "iPhone 15 Pro Max",
    price: "₦ 820,000",
    badge: "New",
    badgeColor: "#C9A84C",
    badgeText: "#0A1628",
  },
  {
    emoji: "👗",
    name: "Ankara Midi Dress",
    price: "₦ 18,500",
    badge: "Hot",
    badgeColor: "#993C1D",
    badgeText: "#fff",
  },
  {
    emoji: "👟",
    name: "Nike Air Force 1",
    price: "₦ 65,000",
    badge: "Sale",
    badgeColor: "#C9A84C",
    badgeText: "#0A1628",
  },
];

const stats = [
  { num: "12k+", label: "Products" },
  { num: "800+", label: "Sellers" },
  { num: "50k+", label: "Buyers" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section style={{ background: "#0A1628" }} className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: "14px",
              }}
            >
              Nigeria's premium marketplace
            </p>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
              className="text-3xl sm:text-4xl lg:text-5xl"
            >
              Shop the{" "}
              <em style={{ color: "#C9A84C", fontStyle: "normal" }}>best</em> of
              Nigeria, <br className="hidden sm:block" />
              delivered to you
            </h1>

            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: "28px",
                maxWidth: "420px",
              }}
            >
              Thousands of verified sellers. Genuine products. Fast delivery
              across all 36 states.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => navigate({ to: "/shop" })}
                style={{
                  background: "#C9A84C",
                  color: "#0A1628",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Shop now
              </button>
              <button
                onClick={() => navigate({ to: "/become-seller" })}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "0.5px solid rgba(255,255,255,0.3)",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#C9A84C")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")
                }
              >
                Become a seller
              </button>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#C9A84C",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: "2px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none">
            {miniProducts.map((product) => (
              <div
                key={product.name}
                onClick={() => navigate({ to: "/shop" })}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(201,168,76,0.35)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.05)";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(201,168,76,0.12)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    flexShrink: 0,
                  }}
                >
                  {product.emoji}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: "13px", color: "#fff", fontWeight: 500 }}
                  >
                    {product.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#C9A84C",
                      marginTop: "3px",
                    }}
                  >
                    {product.price}
                  </div>
                </div>

                <span
                  style={{
                    background: product.badgeColor,
                    color: product.badgeText,
                    fontSize: "10px",
                    fontWeight: 500,
                    padding: "3px 10px",
                    borderRadius: "20px",
                    flexShrink: 0,
                  }}
                >
                  {product.badge}
                </span>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "4px",
                padding: "10px 14px",
                background: "rgba(201,168,76,0.06)",
                border: "0.5px solid rgba(201,168,76,0.15)",
                borderRadius: "10px",
              }}
            >
              <span style={{ fontSize: "16px" }}>🔒</span>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.5,
                }}
              >
                All transactions secured by Paystack. Money-back guarantee on
                every order.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
