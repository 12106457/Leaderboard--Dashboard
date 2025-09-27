import React from "react";

export function Avatar({ children, className = "" }) {
  return (
    <div
      className={`rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }) {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}

export function AvatarFallback({ children }) {
  return <span className="text-gray-600 font-bold">{children}</span>;
}
