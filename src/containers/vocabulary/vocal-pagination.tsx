import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

  const handlePageChange = (page: string) => {
    setPage(parseInt(page));
    if (onChange) {
      onChange(parseInt(page));
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant='outline' onClick={handlePrevious}>
            {'<'}
          </Button>
        </PaginationItem>
        <Select value={page.toString()} onValueChange={handlePageChange}>
          <SelectTrigger className='w-auto'>
            <SelectValue placeholder='Page' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: totalPages }, (_, i) => (
                <SelectItem key={i} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <PaginationItem>
          <Button variant='outline' onClick={handleNext}>
            {'>'}
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
