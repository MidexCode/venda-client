import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer style={{ background: "#0A1628", marginTop: "64px" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#C9A84C",
                marginBottom: "10px",
              }}
            >
              Venda
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
              }}
            >
              Nigeria's premium marketplace. Verified sellers, genuine products,
              fast delivery.
            </p>
          </div>

          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "#C9A84C",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Shop
            </div>
            {["All products", "Flash deals", "New arrivals", "Top sellers"].map(
              (item) => (
                <Link
                  key={item}
                  to="/shop"
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: "8px",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </Link>
              ),
            )}
          </div>

          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "#C9A84C",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Sell
            </div>
            {["Become a seller", "Seller dashboard", "Seller guide"].map(
              (item) => (
                <Link
                  key={item}
                  to="/become-seller"
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: "8px",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </Link>
              ),
            )}
          </div>

          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "#C9A84C",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Help
            </div>
            {["Track order", "Returns", "Contact us", "FAQs"].map((item) => (
              <Link
                key={item}
                to="/track"
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "8px",
                  textDecoration: "none",
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.08)",
            marginTop: "40px",
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
            © 2026 Venda. All rights reserved.
          </span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
            Built with ❤️ in Nigeria
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
