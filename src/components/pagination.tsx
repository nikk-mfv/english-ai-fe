import { UsePagination } from "@/hooks/use-pagination";
export function Pagination() {
  const {page,handlePrev, handleNext } = UsePagination()
  return (
    <div className="join">
      <button className="join-item btn" onClick={handlePrev}>«</button>
      <button className="join-item btn">Page {page}</button>
      <button className="join-item btn" onClick={handleNext}>»</button>
    </div>
  );
}
