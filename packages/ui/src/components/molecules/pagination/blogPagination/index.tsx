

import { FC } from "react";
import { Button } from "../../../atoms";

// Custom pagination component with page numbers
export const BlogPagination: FC<{
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
  }> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    // Generate array of page numbers to display
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      // Always show first page
      pages.push(1);
  
      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
  
      // Handle edge cases
      if (currentPage <= 3) {
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 3, 2);
      }
  
      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pages.push('…');
      }
  
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pages.push('…');
      }
  
      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
  
      return pages;
    };
  
    return (
      <div className="flex w-full justify-around items-center gap-8">
        <Button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          mode="stroke"
          tone="secondary"
          size="sm"
          leadingIcon="arrow-left"
          disabled={currentPage === 1}
          className="!w-10 !h-10 !min-w-10 !px-0"
        />
  
        <div className="flex items-center gap-3">
          {getPageNumbers().map((page, index) => {
            // Skip rendering ellipsis as a separate element
            if (page === '…') {
              return (
                <span key={index} className="text-sm text-gray-500 px-1">
                  …
                </span>
              );
            }
  
            return (
              <button
                key={index}
                className={`flex justify-center items-center size-10 rounded text-md font-semibold cursor-pointer transition-all ${
                  page === currentPage 
                    ? 'text-button-secondary bg-switcher-active border-[0.5px] border-primary' 
                    : 'text-body hover:text-heading'
                }`}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>
  
        <Button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          mode="filled"
          tone="primary"
          size="sm"
          trailingIcon="arrow-right"
          disabled={currentPage === totalPages}
          className="!w-10 !h-10 !min-w-10 !px-0"
        />
      </div>
    );
  };
  