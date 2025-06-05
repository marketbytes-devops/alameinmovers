import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../api/apiClient";
import FormField from "../../Components/FormField";
import AlmasImage from "../../assets/Almas.webp";

const OTPVerification = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", otp: "" },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/otp-verification/", {
        email: email || data.email,
        otp: data.otp,
      });
      alert(response.data.message || "OTP verified successfully");
      navigate("/reset-password", { state: { email: email || data.email } });
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert(error.response?.data?.error || "Invalid or expired OTP. Please try again.");
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Verify OTP</h2>
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
              label="OTP"
              name="otp"
              type="text"
              placeholder="Enter the OTP..."
              register={register}
              required="OTP is required"
              pattern={{
                value: /^\d{6}$/,
                message: "OTP must be 6 digits",
              }}
              error={errors.otp}
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;