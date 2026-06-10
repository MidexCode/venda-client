import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiStar } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import api from "../../lib/api";
import type { Review } from "../../types";

interface ReviewsResponse {
  success: boolean;
  reviews: Review[];
  total: number;
  totalPages: number;
}

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

const StarRating = ({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <HiStar
        key={star}
        style={{
          fontSize: `${size}px`,
          color: star <= Math.round(rating) ? "#C9A84C" : "#D1D5DB",
        }}
      />
    ))}
  </div>
);

const RatingBar = ({
  star,
  count,
  total,
}: {
  star: number;
  count: number;
  total: number;
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <span style={{ fontSize: "12px", color: "#6B7280", width: "12px" }}>
      {star}
    </span>
    <HiStar style={{ color: "#C9A84C", fontSize: "12px", flexShrink: 0 }} />
    <div
      style={{
        flex: 1,
        height: "6px",
        background: "#E5E2DC",
        borderRadius: "3px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${total > 0 ? (count / total) * 100 : 0}%`,
          background: "#C9A84C",
          borderRadius: "3px",
          transition: "width 0.3s ease",
        }}
      />
    </div>
    <span style={{ fontSize: "11px", color: "#9CA3AF", width: "24px" }}>
      {count}
    </span>
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => (
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
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#0A1628",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Playfair Display', serif",
            fontSize: "13px",
            color: "#C9A84C",
            fontWeight: 700,
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {review.user.avatarUrl ? (
            <img
              src={review.user.avatarUrl}
              alt={review.user.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            review.user.name.slice(0, 2).toUpperCase()
          )}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#0A1628",
              }}
            >
              {review.user.name}
            </span>
            {review.isVerified && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  background: "rgba(5,150,105,0.08)",
                  border: "0.5px solid rgba(5,150,105,0.2)",
                  borderRadius: "20px",
                  padding: "1px 6px",
                }}
              >
                <MdVerifiedUser
                  style={{ color: "#059669", fontSize: "11px" }}
                />
                <span style={{ fontSize: "10px", color: "#059669" }}>
                  Verified purchase
                </span>
              </div>
            )}
          </div>
          <div style={{ marginTop: "3px" }}>
            <StarRating rating={review.rating} size={12} />
          </div>
        </div>
      </div>
      <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
        {new Date(review.createdAt).toLocaleDateString("en-NG", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
    </div>

    {review.title && (
      <p
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#0A1628",
          marginBottom: "6px",
        }}
      >
        {review.title}
      </p>
    )}

    <p
      style={{
        fontSize: "13px",
        color: "#6B7280",
        lineHeight: 1.6,
      }}
    >
      {review.body}
    </p>

    {review.images.length > 0 && (
      <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
        {review.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Review"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "6px",
              objectFit: "cover",
              border: "0.5px solid #E5E2DC",
            }}
          />
        ))}
      </div>
    )}

    {/* Seller reply */}
    {review.sellerReply && (
      <div
        style={{
          marginTop: "12px",
          background: "#F5F4F0",
          border: "0.5px solid #E5E2DC",
          borderRadius: "8px",
          padding: "10px 12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "6px",
          }}
        >
          <FiMessageSquare style={{ color: "#C9A84C", fontSize: "12px" }} />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#0A1628",
            }}
          >
            Seller reply
          </span>
        </div>
        <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.6 }}>
          {review.sellerReply}
        </p>
      </div>
    )}
  </div>
);

const ProductReviews = ({
  productId,
  rating,
  reviewCount,
}: ProductReviewsProps) => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["product-reviews", productId, page],
    queryFn: async () => {
      const res = await api.get<ReviewsResponse>(
        `/reviews/product/${productId}`,
        { params: { page, limit: 5 } },
      );
      return res.data;
    },
    enabled: !!productId,
  });

  const mockRatingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: Math.round(
      reviewCount *
        (star === 5
          ? 0.6
          : star === 4
            ? 0.25
            : star === 3
              ? 0.1
              : star === 2
                ? 0.03
                : 0.02),
    ),
  }));

  return (
    <div>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "22px",
          fontWeight: 600,
          color: "#0A1628",
          marginBottom: "20px",
        }}
      >
        Customer reviews
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "24px",
          background: "#fff",
          border: "0.5px solid #E5E2DC",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
        }}
        className="sm:grid-cols-2"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "52px",
              fontWeight: 700,
              color: "#0A1628",
              lineHeight: 1,
            }}
          >
            {rating.toFixed(1)}
          </span>
          <StarRating rating={rating} size={18} />
          <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
            {reviewCount} reviews
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          {mockRatingBreakdown.map(({ star, count }) => (
            <RatingBar
              key={star}
              star={star}
              count={count}
              total={reviewCount}
            />
          ))}
        </div>
      </div>

      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: "0.5px solid #E5E2DC",
                borderRadius: "12px",
                padding: "16px",
                height: "120px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      ) : data?.reviews.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 0",
            background: "#fff",
            border: "0.5px solid #E5E2DC",
            borderRadius: "12px",
          }}
        >
          <FiMessageSquare
            style={{
              fontSize: "36px",
              color: "#D1D5DB",
              margin: "0 auto 12px",
              display: "block",
            }}
          />
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "16px",
              color: "#0A1628",
              marginBottom: "4px",
            }}
          >
            No reviews yet
          </p>
          <p style={{ fontSize: "12px", color: "#9CA3AF" }}>
            Be the first to review this product
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {data?.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
          }}
        >
          {Array.from({ length: data.totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                border: "0.5px solid #E5E2DC",
                background: page === i + 1 ? "#0A1628" : "#fff",
                color: page === i + 1 ? "#C9A84C" : "#374151",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default ProductReviews;
