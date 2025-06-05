import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../api/apiClient";
import FormField from "../../Components/FormField";
import AlmasImage from "../../assets/Almas.webp";

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: { email: "", new_password: "", confirm_new_password: "" },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/reset-password/", {
        email: email || data.email,
        new_password: data.new_password,
        confirm_new_password: data.confirm_new_password,
      });
      alert(response.data.message || "Password reset successfully");
      navigate("/login");
    } catch (error) {
      console.error("Reset password failed:", error);
      alert(error.response?.data?.error || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const newPassword = watch("new_password");

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden">
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${AlmasImage})` }}
        ></div>
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Password</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!email && (
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
            )}
            <FormField
              label="New Password"
              name="new_password"
              type="password"
              placeholder="Enter new password..."
              register={register}
              required="New password is required"
              minLength={{
                value: 8,
                message: "Password must be at least 8 characters",
              }}
              pattern={{
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must include uppercase, lowercase, number, and special character",
              }}
              error={errors.new_password}
            />
            <FormField
              label="Confirm New Password"
              name="confirm_new_password"
              type="password"
              placeholder="Confirm new password..."
              register={register}
              required="Confirm password is required"
              validate={(value) =>
                value === newPassword || "Passwords do not match"
              }
              error={errors.confirm_new_password}
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;