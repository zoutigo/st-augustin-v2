import React from "react";

export const Spinner: React.FC<{ size?: string; className?: string }> = ({
  size = "h-6 w-6",
  className = "",
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-primary border-gray-300 ${size} ${className}`}
    />
  );
};
