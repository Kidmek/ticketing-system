interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className = "",
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

export default Input;
