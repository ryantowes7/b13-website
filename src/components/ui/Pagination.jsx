// website/src/components/ui/Pagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);
  
  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 sm:px-3 text-xs sm:text-sm py-1.5 sm:py-2"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant="outline"
            onClick={() => onPageChange(1)}
            className="px-2 sm:px-3 text-xs sm:text-sm py-1.5 sm:py-2"
          >
            1
          </Button>
          {startPage > 2 && <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>}
        </>
      )}

      {pages.map(page => (
        <Button
          key={page}
          variant={currentPage === page ? "primary" : "outline"}
          onClick={() => onPageChange(page)}
          className="px-2 sm:px-3 text-xs sm:text-sm py-1.5 sm:py-2"
          aria-label={`Halaman ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>}
          <Button
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            className="px-2 sm:px-3 text-xs sm:text-sm py-1.5 sm:py-2"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-3 text-xs sm:text-sm py-1.5 sm:py-2"
        aria-label="Halaman berikutnya"
      >
        <ChevronRight size={14} className="sm:w-4 sm:h-4" />
      </Button>
    </div>
  );
};

export default Pagination;