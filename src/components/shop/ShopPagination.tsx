import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ShopPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ShopPaginationProps) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  const btnBase: React.CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    transition: "all 0.15s",
    border: "0.5px solid #E5E2DC",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        marginTop: "32px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...btnBase,
          width: "auto",
          padding: "0 12px",
          gap: "4px",
          background: currentPage === 1 ? "#F5F4F0" : "#fff",
          color: currentPage === 1 ? "#9CA3AF" : "#0A1628",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        <FiChevronLeft size={14} />
        <span>Prev</span>
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            style={{
              width: "36px",
              textAlign: "center",
              fontSize: "13px",
              color: "#9CA3AF",
            }}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            style={{
              ...btnBase,
              background: currentPage === page ? "#0A1628" : "#fff",
              color: currentPage === page ? "#C9A84C" : "#374151",
              borderColor: currentPage === page ? "#0A1628" : "#E5E2DC",
            }}
            onMouseEnter={(e) => {
              if (currentPage !== page) {
                e.currentTarget.style.borderColor = "#C9A84C";
                e.currentTarget.style.color = "#0A1628";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== page) {
                e.currentTarget.style.borderColor = "#E5E2DC";
                e.currentTarget.style.color = "#374151";
              }
            }}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...btnBase,
          width: "auto",
          padding: "0 12px",
          gap: "4px",
          background: currentPage === totalPages ? "#F5F4F0" : "#fff",
          color: currentPage === totalPages ? "#9CA3AF" : "#0A1628",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        <span>Next</span>
        <FiChevronRight size={14} />
      </button>
    </div>
  );
};

export default ShopPagination;
