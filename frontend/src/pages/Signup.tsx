import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/molecules/FormField";
import Button from "../components/atoms/Button";
import Select from "../components/atoms/Select";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import ErrorText from "../components/atoms/ErrorText";
import axiosInstance from "../api/axiosInstance";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setFormError("");

    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/auth/signup", {
        username,
        password,
        role,
      });
      navigate("/login");
    } catch (error: any) {
      if (error.response) {
        setFormError(error.response.data.message || "An error occurred");
      } else if (error.request) {
        setFormError("Network error, please try again");
      } else {
        setFormError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Signup
        </h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <FormField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              placeholder="Enter username"
              error={usernameError}
            />
            <FormField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="Enter password"
              error={passwordError}
            />
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Role</label>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value as "user" | "admin")}
                options={[
                  { value: "user", label: "User" },
                  { value: "admin", label: "Admin" },
                ]}
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Signup
            </Button>
            {formError && <ErrorText message={formError} />}
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
