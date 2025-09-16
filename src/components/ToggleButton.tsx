import React from "react";

interface ToggleButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex border border-[#3892D3] rounded-sm overflow-hidden">
      {options.map((option) => {
        const isActive = value === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-2 py-1 text-[11px] font-semibold transition-colors uppercase
              ${isActive ? "bg-[#296A9A] text-white" : "bg-[#3183BE]"}
              border-r border-[#3183BE] last:border-r-0
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};