interface ErrorTextProps {
  message: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ message }) => (
  <p className="text-red-500 text-sm mt-1">{message}</p>
);

export default ErrorText;
