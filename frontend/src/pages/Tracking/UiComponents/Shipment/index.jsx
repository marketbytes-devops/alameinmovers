import React, { useState } from "react";
import { motion } from "framer-motion";
import TitleDescription from "../../../../components/TitleDescription";
import Button from "../../../../components/Button";
import FormField from "../../../../components/FormField";
import apiClient from "../../../../api/apiClient";

const faqs = [
  {
    id: "shipment-number",
    title: "How do I track my shipment?",
    description:
      "To track your shipment, simply enter the 10-character tracking number (4 letters and 6 digits) in the field provided. You'll receive real-time updates on your cargo’s status and location.",
  },
  {
    id: "tracking-info",
    title: "What if my tracking number isn’t working?",
    description: "Ensure that the tracking number is entered correctly (4 letters and 6 digits). If the issue persists, please contact our customer support team for assistance.",
  },
  {
    id: "tracking-info",
    title: "Can I track my shipment internationally?",
    description: "Yes, you can track your shipment globally using the same tracking number. We provide real-time updates no matter where your cargo is located.",
  },
];

const accordionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

const Shipment = () => {
  const [formData, setFormData] = useState({
    trackingNumber: "",
  });
  const [openSection, setOpenSection] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    if (!formData.trackingNumber) {
      setError("Please enter a tracking number.");
      return;
    }

    apiClient
      .get(`jobs/jobs/?tracking_id=${formData.trackingNumber}`)
      .then((response) => {
        if (response.data.length > 0) {
          setTrackingResult(response.data[0]);
          setError("");
        } else {
          setTrackingResult(null);
          setError("No job found with this tracking number.");
        }
      })
      .catch((error) => {
        setTrackingResult(null);
        setError("Failed to fetch tracking details. Please try again.");
        console.error("Tracking error:", error);
      });
  };

  const handleCloseTrackingModal = () => {
    setTrackingResult(null);
    setFormData((prev) => ({
      ...prev,
      trackingNumber: "",
    }));
    setError("");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div>
      <TitleDescription
        title="Track Your Shipment"
        titleClass="text-2xl sm:text-3xl md:text-4xl text-black font-semibold"
        description="Enter the tracking number to view the current location and status of your cargo in real-time."
        descriptionClass="text-base sm:text-lg text-black mt-4 sm:mt-6"
        style={{ fontFamily: '"Poppins", sans-serif' }}
      />

      <div className="relative bg-gradient-to-b from-gray-500 to-primary text-white p-4 sm:p-6 shadow-lg w-full mx-auto overflow-hidden flex flex-col sm:flex-row items-center gap-4 rounded-xl mt-6 sm:mt-8">
        <FormField
          type="text"
          name="trackingNumber"
          placeholder="Input your 10-character tracking number to check the current status of your shipment"
          value={formData.trackingNumber}
          onChange={handleInputChange}
          required
          className="w-full sm:flex-1 text-sm sm:text-base"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        />
        <Button
          label="Track"
          icon="ArrowUpRight"
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-lg bg-secondary text-black rounded-xl hover:bg-white hover:text-black transition-colors"
          style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 500 }}
          onClick={handleTrackingSubmit}
        />
      </div>

      {error && !trackingResult && (
        <p className="text-red-500 mt-4 text-center">{error}</p>
      )}

      {/* Tracking Details Modal */}
      {trackingResult && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleCloseTrackingModal}
          ></div>

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 max-h-[85vh] overflow-y-auto border border-gray-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseTrackingModal}
              className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none"
              aria-label="Close tracking modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Header */}
            <h2 className="text-xl font-semibold text-gray-800 bg-gray-50 py-3 px-4 rounded-md mb-6 text-center">
              Tracking Details
            </h2>

            {/* Job Details */}
            <div className="space-y-4 text-gray-700 text-left">
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Tracking ID:</span>{" "}
                <span className="text-gray-600">{trackingResult.tracking_id}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Cargo Type:</span>{" "}
                <span className="text-gray-600">{trackingResult.cargo_type}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Customer Name:</span>{" "}
                <span className="text-gray-600">{trackingResult.customer?.name || "-"}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Receiver Name:</span>{" "}
                <span className="text-gray-600">{trackingResult.receiver_name || "-"}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Contact Number:</span>{" "}
                <span className="text-gray-600">{trackingResult.contact_number || "-"}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Email:</span>{" "}
                <span className="text-gray-600">{trackingResult.email}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Recipient Address:</span>{" "}
                <span className="text-gray-600">{trackingResult.recipient_address}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Recipient Country:</span>{" "}
                <span className="text-gray-600">{trackingResult.recipient_country}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Commodity:</span>{" "}
                <span className="text-gray-600">{trackingResult.commodity}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Number of Packages:</span>{" "}
                <span className="text-gray-600">{trackingResult.number_of_packages}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Weight:</span>{" "}
                <span className="text-gray-600">{trackingResult.weight} kg</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Volume:</span>{" "}
                <span className="text-gray-600">{trackingResult.volume} m³</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Origin:</span>{" "}
                <span className="text-gray-600">{trackingResult.origin}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Destination:</span>{" "}
                <span className="text-gray-600">{trackingResult.destination}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Cargo Reference Number:</span>{" "}
                <span className="text-gray-600">{trackingResult.cargo_ref_number || "-"}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Collection Date:</span>{" "}
                <span className="text-gray-600">{formatDate(trackingResult.collection_date)}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Date of Departure:</span>{" "}
                <span className="text-gray-600">{formatDate(trackingResult.date_of_departure)}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[#4C7085]">Date of Arrival:</span>{" "}
                <span className="text-gray-600">{formatDate(trackingResult.date_of_arrival)}</span>
              </p>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Status Updates */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 bg-gray-50 py-2 px-4 rounded-md mb-4 text-center">
                Status Updates
              </h3>
              {trackingResult.status_updates?.length > 0 ? (
                <div className="space-y-3">
                  {trackingResult.status_updates.map((update) => (
                    <div
                      key={update.id}
                      className="text-gray-700 text-left bg-gray-50 p-3 rounded-md border border-gray-200"
                    >
                      <p className="text-sm">
                        <span className="font-semibold text-[#4C7085]">Status:</span>{" "}
                        <span className="text-gray-600">{update.status_content}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-[#4C7085]">Date:</span>{" "}
                        <span className="text-gray-600">{formatDate(update.status_date)}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-[#4C7085]">Time:</span>{" "}
                        <span className="text-gray-600">{update.status_time}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 text-left">
                  No status updates available.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      <TitleDescription
        description=""
        descriptionClass="text-sm sm:text-base text-primary/100 mt-4 sm:mt-6"
        style={{ fontFamily: '"Poppins", sans-serif' }}
      />

      <div className="border border-primary/20 my-8 sm:my-10 md:my-12"></div>

      <div className="w-full pt-2">
        <div className="space-y-4 sm:space-y-4 lg:space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <div
                className={`flex items-center justify-between p-3 sm:p-4 rounded-lg bg-primary_blue/40 cursor-pointer`}
                onClick={() => toggleSection(faq.id)}
              >
                <h3
                  className="text-sm sm:text-base md:text-lg text-black"
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                >
                  {faq.title}
                </h3>
                <button
                  className="text-base sm:text-lg text-gray-800"
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                >
                  {openSection === faq.id ? "−" : "+"}
                </button>
              </div>
              {openSection === faq.id && (
                <motion.div
                  className="px-4 py-3 sm:py-4 rounded-lg bg-white"
                  variants={accordionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p
                    className="text-xs sm:text-sm md:text-base text-gray-600"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                  >
                    {faq.description}
                  </p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shipment;