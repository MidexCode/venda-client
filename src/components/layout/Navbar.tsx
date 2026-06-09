import { Link, useNavigate } from "@tanstack/react-router";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import useCartStore from "../../store/cartStore";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const cartCount = useCartStore((s) => s.items.length);
  const navigate = useNavigate();

  return (
    <nav style={{ background: "#0A1628" }} className="w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link
          to="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#C9A84C",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          Venda
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: "Sellers", to: "/sellers/techub-lagos" },
            { label: "Deals", to: "/deals" },
            { label: "Track order", to: "/track" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ textDecoration: "none" }}
              activeProps={{ style: { color: "#C9A84C", fontWeight: 500 } }}
            >
              {({ isActive }) => (
                <span
                  style={{
                    fontSize: "13px",
                    color: isActive ? "#C9A84C" : "rgba(255,255,255,0.6)",
                    fontWeight: isActive ? 500 : 400,
                    transition: "color 0.15s",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/shop" })}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "160px",
              cursor: "text",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
              Search Venda...
            </span>
          </button>

          <Link to="/cart" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#C9A84C",
                color: "#0A1628",
                border: "none",
                padding: "6px 14px",
                borderRadius: "7px",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A1628"
                strokeWidth="2"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </Link>

          {/* Auth */}
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: "32px",
                    height: "32px",
                    border: "1.5px solid #C9A84C",
                  },
                },
              }}
            />
          ) : (
            <SignInButton mode="modal">
              <button
                style={{
                  background: "transparent",
                  border: "0.5px solid rgba(255,255,255,0.25)",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "7px",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Sign in
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
