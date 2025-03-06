import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded 
      focus:outline-none focus:ring-2 focus:ring-blue-500  ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
