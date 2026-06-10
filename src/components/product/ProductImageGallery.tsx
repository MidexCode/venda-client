import { useState } from "react";
import { FiZoomIn } from "react-icons/fi";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

const ProductImageGallery = ({ images, name }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const hasImages = images.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div
        style={{
          background: "#0A1628",
          borderRadius: "14px",
          overflow: "hidden",
          position: "relative",
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "zoom-in",
        }}
        onClick={() => setZoomed(true)}
      >
        {hasImages ? (
          <img
            src={images[activeIndex]}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "80px",
              fontWeight: 700,
              color: "rgba(201,168,76,0.2)",
            }}
          >
            V
          </span>
        )}

        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(4px)",
            borderRadius: "8px",
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11px",
            color: "#fff",
          }}
        >
          <FiZoomIn size={13} />
          Zoom
        </div>
      </div>

      {images.length > 1 && (
        <div style={{ display: "flex", gap: "8px" }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "8px",
                overflow: "hidden",
                border: `2px solid ${activeIndex === i ? "#C9A84C" : "transparent"}`,
                padding: 0,
                cursor: "pointer",
                flexShrink: 0,
                background: "#0A1628",
              }}
            >
              <img
                src={img}
                alt={`${name} ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      )}

      {zoomed && hasImages && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,22,40,0.92)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "24px",
          }}
        >
          <img
            src={images[activeIndex]}
            alt={name}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
