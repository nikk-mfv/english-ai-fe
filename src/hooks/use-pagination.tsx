import { useState } from "react";

export function UsePagination() {
  const [currentPage, setPage] = useState(1);

  const handlePrev = () => {
    if (currentPage == 1) return;
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setPage(newPage);
      console.log(newPage)
    }
   
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    setPage(newPage);
    console.log(newPage)
  };
  return { currentPage, handlePrev, handleNext };
}
