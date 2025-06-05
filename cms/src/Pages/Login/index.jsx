import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import apiClient from "../../api/apiClient";
import FormField from "../../Components/FormField";
import AlmasImage from "../../assets/Almas.webp";

const Login = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Sending login request:", data);
      const response = await apiClient.post("/auth/login/", {
        email: data.email,
        password: data.password,
      });
      console.log("Login response:", response);
      const { access, refresh, role } = response.data;
      if (!access || !refresh || !['admin', 'enquiry'].includes(role)) {
        throw new Error("Invalid response data");
      }
      if (typeof onLogin !== "function") {
        throw new Error("onLogin is not a function");
      }
      console.log("Calling onLogin with tokens and role:", { access, refresh, role });
      onLogin(access, refresh, role);
      const from = location.state?.from?.pathname || "/home";
      console.log("Navigating to:", from);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert(error.response?.data?.error || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden">
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${AlmasImage})` }}
        ></div>
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email..."
              register={register}
              required="Email is required"
              pattern={{
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              }}
              error={errors.email}
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password..."
              register={register}
              required="Password is required"
              minLength={{
                value: 6,
                message: "Password must be at least 6 characters",
              }}
              error={errors.password}
            />
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-gray-800 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;