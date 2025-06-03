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
  const [error, setError] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const serviceOptions = [
    { value: "localMove", label: "Local Move" },
    { value: "internationalMove", label: "International Move" },
    { value: "carExport", label: "Car Import and Export" },
    { value: "storageServices", label: "Storage Services" },
    { value: "logistics", label: "Logistics" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setError("reCAPTCHA verification failed. Please try again.");
      return;
    }

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
        setError("");
        onClose();
        setShowThankYouModal(true);
      })
      .catch((error) => {
        setError("Form submission failed. Please try again.");
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
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <FormField
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                />
                <FormField
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
                <FormField
                  type="select"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  options={serviceOptions}
                  placeholder="Service type"
                  required
                />
                <FormField
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                />
                <Captcha setRecaptchaToken={setRecaptchaToken} />
                <div className="flex justify-center">
                  <Button
                    label="Submit"
                    icon="ArrowUpRight"
                    className="w-fit bg-secondary text-black rounded-2xl px-4 py-3 text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button"
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