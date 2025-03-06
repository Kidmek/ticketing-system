import Input from "../atoms/Input";
import ErrorText from "../atoms/ErrorText";

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div className="mb-4">
    <label className="block mb-1 text-gray-700">{label}</label>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? "border-red-500" : ""}
    />
    {error && <ErrorText message={error} />}
  </div>
);

export default FormField;
