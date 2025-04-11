import { useState } from "react";
import { useNavigate } from 'react-router-dom';

type PaginationProps = {
  totalPages: number;
  onChange?: (page: number) => void;
};

export function Pagination({ totalPages, onChange }: PaginationProps) {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handlePrev = () => {
    if (page == 1) return;

    const currentPage = page - 1;
    setPage(currentPage);
    navigate(`?page=${currentPage}`);
    if (onChange) onChange(page - 1);
  };

  const handleNext = () => {
    if (page == totalPages) return;

    const currentPage = page + 1;
    setPage(currentPage);
    navigate(`?page=${currentPage}`);
    if (onChange) onChange(page + 1);
  };

  return (
    <div className="join flex justify-center m-3">
      <button
        disabled={page == 1}
        className="join-item btn"
        onClick={handlePrev}
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        disabled={page == totalPages}
        className="join-item btn"
        onClick={handleNext}
      >
        »
      </button>
    </div>
  );
}
