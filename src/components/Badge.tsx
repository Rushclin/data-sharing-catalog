import React from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  color?: string; // ex: "bg-yellow-400"
  text: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  color = "bg-yellow-400",
  text,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "inline-flex items-center px-3 py-1 rounded-md text-white text-sm font-medium",
        className
      )}
    >
      <span className={`w-3.5 h-3.5 rounded-full mr-1 ${color}`} />
      {text}
    </div>
  );
};