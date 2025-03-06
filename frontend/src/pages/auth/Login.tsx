// src/pages/Login.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../../store/authSlice";
import FormField from "../../components/molecules/FormField";
import Button from "../../components/atoms/Button";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";
import ErrorText from "../../components/atoms/ErrorText";
import axiosInstance from "../../api/axiosInstance";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
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
      const response = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });
      const { token } = response.data;
      const decoded: { role: "user" | "admin" } = jwtDecode(token);
      dispatch(setCredentials({ token, role: decoded.role }));
      console.log(decoded);
      navigate(decoded.role === "admin" ? "/admin" : "/user");
    } catch (error: any) {
      console.log(error);
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
          Login
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
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
            {formError && <ErrorText message={formError} />}
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
