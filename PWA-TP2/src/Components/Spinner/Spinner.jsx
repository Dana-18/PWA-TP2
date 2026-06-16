import React from "react";

export default function Spinner({ size = "md" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-300 border-t-teal-500 rounded-full animate-spin`}
      ></div>
    </div>
  );
}
