import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Comment out the condition that hides pagination for single pages
  // if (totalPages <= 1) return null;
  
  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const effectiveTotalPages = Math.max(1, totalPages);

    for (let i = 1; i <= effectiveTotalPages; i++) {
      pages.push(i);
    }

    return pages;
  };
  
  // Ensure we have at least one page for display purposes
  const displayTotalPages = Math.max(1, totalPages);
  const displayCurrentPage = Math.min(Math.max(1, currentPage), displayTotalPages);
  
  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Page {displayCurrentPage} of {displayTotalPages}
      </div>

      <div className="pagination">
        {/* Previous button */}
        <button 
          className={`pagination-button pagination-nav ${displayCurrentPage === 1 ? 'disabled' : ''}`}
          onClick={() => displayCurrentPage > 1 && onPageChange(displayCurrentPage - 1)}
          disabled={displayCurrentPage === 1}
          aria-label="Previous page"
        >
          <span className="pagination-icon">&laquo;</span>
          <span className="pagination-text">Prev</span>
        </button>
        
        {/* Page numbers */}
        <div className="pagination-numbers">
          {getPageNumbers().map((page) => (
              <button
                key={`page-${page}`}
                className={`pagination-number ${displayCurrentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={displayCurrentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
          ))}
        </div>
        
        {/* Next button */}
        <button 
          className={`pagination-button pagination-nav ${displayCurrentPage === displayTotalPages ? 'disabled' : ''}`}
          onClick={() => displayCurrentPage < displayTotalPages && onPageChange(displayCurrentPage + 1)}
          disabled={displayCurrentPage === displayTotalPages}
          aria-label="Next page"
        >
          <span className="pagination-text">Next</span>
          <span className="pagination-icon">&raquo;</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
