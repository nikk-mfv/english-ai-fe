import { useState, useMemo } from "react";

type PaginationProps = {
  total: number;
  onChange?: (page: number) => void;
};

export function Pagination({ total, onChange }: PaginationProps) {
  const [page, setPage] = useState(1);
  
  const pageSize = 10
  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [total]
  );

  const handlePrev = () => {
    if (page === 1) return;

    const currentPage = page - 1;
    setPage(currentPage);
    if (onChange) onChange(page - 1);
  };

  const handleNext = () => {
    if (page === totalPages) return;

    const currentPage = page + 1;
    setPage(currentPage);
    if (onChange) onChange(page + 1);
  };
  console.log("total:", total, "page:", page, "totalPages:", totalPages);
  return (
    <div className="join flex justify-center m-3">
      <button
        disabled={page === 1}
        className="join-item btn"
        onClick={handlePrev}
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        disabled={page === totalPages && totalPages <= pageSize}
        className="join-item btn"
        onClick={handleNext}
      >
        »
      </button>
    </div>
  );
}
