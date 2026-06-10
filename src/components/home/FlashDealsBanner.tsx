import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { HiLightningBolt } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";

const DEAL_END_HOURS = 8;

const useCountdown = () => {
  const [time, setTime] = useState({
    hours: DEAL_END_HOURS,
    minutes: 34,
    seconds: 12,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};

const TimerBox = ({ value, label }: { value: number; label: string }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.07)",
      border: "0.5px solid rgba(255,255,255,0.12)",
      borderRadius: "10px",
      padding: "10px 14px",
      textAlign: "center",
      minWidth: "60px",
    }}
  >
    <div
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "24px",
        fontWeight: 700,
        color: "#C9A84C",
        lineHeight: 1,
      }}
    >
      {String(value).padStart(2, "0")}
    </div>
    <div
      style={{
        fontSize: "9px",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginTop: "4px",
      }}
    >
      {label}
    </div>
  </div>
);

const FlashDealsBanner = () => {
  const navigate = useNavigate();
  const { hours, minutes, seconds } = useCountdown();

  return (
    <section style={{ background: "#F5F4F0" }} className="w-full py-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            background: "#0A1628",
            borderRadius: "16px",
            padding: "28px 32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "-60px",
              top: "-60px",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "8px",
                }}
              >
                <HiLightningBolt
                  style={{ color: "#C9A84C", fontSize: "14px" }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "#C9A84C",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Flash deals
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "6px",
                  lineHeight: 1.2,
                }}
                className="sm:text-3xl"
              >
                Up to <span style={{ color: "#C9A84C" }}>60% off</span> on
                electronics
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "20px",
                }}
              >
                Limited time only — grab the best deals before they're gone
              </p>

              <button
                onClick={() => navigate({ to: "/deals" })}
                style={{
                  background: "#C9A84C",
                  color: "#0A1628",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Shop deals
                <FiArrowRight size={14} />
              </button>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-3">
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Ends in
              </span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <TimerBox value={hours} label="hrs" />
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
                    color: "#C9A84C",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  :
                </span>
                <TimerBox value={minutes} label="min" />
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
                    color: "#C9A84C",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  :
                </span>
                <TimerBox value={seconds} label="sec" />
              </div>

              <div
                style={{
                  background: "rgba(201,168,76,0.1)",
                  border: "0.5px solid rgba(201,168,76,0.2)",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontSize: "11px",
                  color: "#C9A84C",
                  fontWeight: 500,
                }}
              >
                48 deals live now
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashDealsBanner;
