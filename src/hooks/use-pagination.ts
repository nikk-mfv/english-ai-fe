import { useState } from "react";

export function UsePagination() {
  const [page, setPage] = useState(1);

  const handlePrev = () => {
    if (page == 1) return;
    if (page > 1) {
      const currentPage = page - 1;
      setPage(currentPage);
      console.log(currentPage);
    }
  };

  const handleNext = () => {
    const currentPage = page + 1;
    setPage(currentPage);
    console.log(currentPage);
  };
  return { page, handlePrev, handleNext };
}
