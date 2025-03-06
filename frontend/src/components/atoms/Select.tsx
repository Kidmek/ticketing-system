interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className = "",
}) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full p-2 border rounded ${className}`}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
