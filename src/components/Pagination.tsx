interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers: (number | "gap")[] = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page += 1) {
      pageNumbers.push(page);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push("gap");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let page = start; page <= end; page += 1) {
      pageNumbers.push(page);
    }

    if (currentPage < totalPages - 2) pageNumbers.push("gap");
    pageNumbers.push(totalPages);
  }

  const buttonBase =
    "min-w-9 h-9 px-2 rounded-md text-sm font-medium transition-colors " +
    "disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav
      aria-label="Product pages"
      className="flex items-center justify-center gap-1 mt-8"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBase} text-navy hover:bg-sky`}
      >
        Previous
      </button>

      {pageNumbers.map((page, index) =>
        page === "gap" ? (
          <span
            key={`gap-${index}`}
            className="px-1 text-teal"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`${buttonBase} ${
              page === currentPage
                ? "bg-navy text-white"
                : "text-navy hover:bg-sky"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonBase} text-navy hover:bg-sky`}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
