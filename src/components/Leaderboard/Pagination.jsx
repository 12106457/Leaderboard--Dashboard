// src/ui/Pagination.jsx
import { DotsThree } from "phosphor-react";
import React from "react";

export const Pagination = ({ 
  totalPages, 
  currentPage, 
  onPageChange, 
  limit, 
  onLimitChange 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - 2 && i > 1) ||
        (i === currentPage + 2 && i < totalPages)
      ) {
        pages.push("ellipsis-" + i);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Rows per page selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="rows" className="text-sm text-[var(--q3-neutral-default)]">
          Rows per page:
        </label>
        <select
          id="rows"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-2 py-1 rounded-md border border-[var(--q3-stroke-normal)] bg-[var(--q3-surface-default)] text-[var(--q3-neutral-default)]"
        >
          {[5, 10, 20, 50, 100].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination controls */}
      <nav className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-full disabled:opacity-50 bg-[var(--q3-surface-default)] border-2 border-[var(--q3-stroke-normal)] text-[var(--q3-neutral-default)]"
        >
          Previous
        </button>

        {pages.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-full border ${
                page === currentPage
                  ? "bg-[var(--q3-accent-normal)] text-[var(--q3-neutral-default_inverted)] border-0"
                  : "bg-[var(--q3-surface-default)] text-[var(--q3-neutral-default)] border-[var(--q3-stroke-normal)]"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="px-2 py-1 border rounded-full bg-[var(--q3-surface-default)] text-[var(--q3-neutral-default)] border-[var(--q3-stroke-normal)] flex justify-center items-center"
            >
              <DotsThree size={24} />
            </span>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-full disabled:opacity-50 bg-[var(--q3-surface-default)] border-2 border-[var(--q3-stroke-normal)] text-[var(--q3-neutral-default)]"
        >
          Next
        </button>
      </nav>
    </div>
  );
};
