import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormField from "../FormField";
import Button from "../Button";
import Captcha from "../Captcha";
import apiClient from "../../api/apiClient";
import ThankYouModal from "../ThankYouModal";

const ModalForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    serviceType: "",
    message: "",
    refererUrl: window.location.href,
    submittedUrl: window.location.href,
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    serviceType: "",
    message: "",
    recaptcha: "",
  });
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const serviceOptions = [
    { value: "localMove", label: "Local Move" },
    { value: "internationalMove", label: "International Move" },
    { value: "carExport", label: "Car Import and Export" },
    { value: "storageServices", label: "Storage Services" },
    { value: "logistics", label: "limitless Logistics" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {
      fullName: "",
      phoneNumber: "",
      email: "",
      serviceType: "",
      message: "",
      recaptcha: "",
    };
    let hasError = false;

    if (!formData.fullName) {
      newErrors.fullName = "Please enter your full name.";
      hasError = true;
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Please enter your phone number.";
      hasError = true;
    }
    if (!formData.email) {
      newErrors.email = "Please enter your email address.";
      hasError = true;
    }
    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type.";
      hasError = true;
    }
    if (!formData.message) {
      newErrors.message = "Please enter a message.";
      hasError = true;
    }
    if (!recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    apiClient
      .post("contacts/enquiries/", {
        ...formData,
        recaptchaToken,
      })
      .then((response) => {
        console.log("Enquiry Form submitted:", response.data);
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          serviceType: "",
          message: "",
          refererUrl: window.location.href,
          submittedUrl: window.location.href,
        });
        setRecaptchaToken("");
        setErrors({
          fullName: "",
          phoneNumber: "",
          email: "",
          serviceType: "",
          message: "",
          recaptcha: "",
        });
        setIsLoading(false);
        onClose();
        setShowThankYouModal(true);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error || "Form submission failed. Please try again.";
        setErrors((prev) => ({
          ...prev,
          recaptcha: errorMessage,
        }));
        setIsLoading(false);
        console.error("Form submission error:", error);
      });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              className="absolute inset-0 bg-black"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
            />
            <motion.div
              className="relative bg-gradient-to-b from-gray-500 to-primary text-white rounded-3xl p-8 shadow-lg w-full max-w-lg mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl text-center mb-6">Moving Soon? Let's Talk</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Name"
                  error={errors.fullName}
                />
                <FormField
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number"
                  error={errors.phoneNumber}
                />
                <FormField
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  error={errors.email}
                />
                <FormField
                  type="select"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  options={serviceOptions}
                  placeholder="Service type"
                  error={errors.serviceType}
                />
                <FormField
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  error={errors.message}
                />
                <div>
                  <Captcha setRecaptchaToken={setRecaptchaToken} />
                  {errors.recaptcha && (
                    <p className="text-red-500 text-xs mt-1">{errors.recaptcha}</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Button
                    label={isLoading ? "Submitting" : "Submit"}
                    icon={isLoading ? null : "ArrowUpRight"}
                    className={`w-fit bg-secondary text-black rounded-2xl px-4 py-3 text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                    isLoading={isLoading}
                  />
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        from="enquiry"
      />
    </>
  );
};

export default ModalForm;