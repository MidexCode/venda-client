import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import ProductCard from "./ProductCard";
import type { Product } from "../../types";

interface RelatedProductsProps {
  categorySlug: string;
  currentProductId: string;
}

const RelatedProducts = ({
  categorySlug,
  currentProductId,
}: RelatedProductsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["related-products", categorySlug],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; products: Product[] }>(
        "/products",
        { params: { category: categorySlug, limit: 5 } },
      );
      return res.data.products.filter((p) => p.id !== currentProductId);
    },
    enabled: !!categorySlug,
  });

  if (!isLoading && (!data || data.length === 0)) return null;

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
        You might also like
      </h2>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "0.5px solid #E5E2DC",
                  borderRadius: "12px",
                  height: "280px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))
          : data
              ?.slice(0, 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default RelatedProducts;
