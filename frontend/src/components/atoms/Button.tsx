interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

export default Button;
