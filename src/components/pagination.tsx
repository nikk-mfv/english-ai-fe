import { UsePagination } from "@/hooks/use-pagination"

export function Pagination() {
  const {currentPage, handlePrev, handleNext} = UsePagination()
    return (
        <div className="join">
        <button className="join-item btn" onClick={handlePrev}>«</button>
        <button className="join-item btn">Page {currentPage}</button>
        <button className="join-item btn" onClick={handleNext}>»</button>
      </div>
    )
}

