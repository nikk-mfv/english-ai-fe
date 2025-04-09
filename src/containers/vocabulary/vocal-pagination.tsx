import { useMemo, useState } from 'react';

type VocabularyPaginationProps = {
  total: number;
  onChange?: (page: number) => void;
};

export function VocabularyPagination({
  total,
  onChange,
}: VocabularyPaginationProps) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(total / 10), [total]);

  const handlePrevious = () => {
    if (page === 1) return;
    setPage(page - 1);
    if (onChange) {
      onChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page === totalPages) return;
    setPage(page + 1);
    if (onChange) {
      onChange(page + 1);
    }
  };

  return (
    <div className='join'>
      <button
        disabled={page === 1}
        className='join-item btn'
        onClick={handlePrevious}
      >
        «
      </button>
      <button className='join-item btn'>Page {page}</button>
      <button
        disabled={page === totalPages}
        className='join-item btn'
        onClick={handleNext}
      >
        »
      </button>
    </div>
  );
}
