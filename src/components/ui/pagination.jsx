// src/ui/pagination.jsx
import React from "react";

// Main Pagination wrapper
export const Pagination = ({ children }) => (
  <nav className="flex items-center space-x-1">{children}</nav>
);

// Pagination content wrapper
export const PaginationContent = ({ children }) => <>{children}</>;

// Single page item
export const PaginationItem = ({ children }) => (
  <div className="px-1">{children}</div>
);

// Link to page
export const PaginationLink = ({ children, href, isActive }) => (
  <a
    href={href}
    className={`px-3 py-1 rounded ${
      isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    }`}
  >
    {children}
  </a>
);

// Previous button
export const PaginationPrevious = ({ href }) => (
  <a href={href} className="px-3 py-1 bg-gray-200 rounded-full">
    Prev
  </a>
);

// Next button
export const PaginationNext = ({ href }) => (
  <a href={href} className="px-3 py-1 bg-gray-200 rounded-full">
    Next
  </a>
);

// Ellipsis
export const PaginationEllipsis = () => (
  <span className="px-3 py-1">...</span>
);
