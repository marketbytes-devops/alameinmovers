import React, { useState } from "react";
import { motion } from "framer-motion";
import backgroundImage from "../../../../assets/img-6.webp";
import apiClient from "../../../../api/apiClient";
import Button from "../../../../components/Button";
import FormField from "../../../../components/FormField";
import Captcha from "../../../../components/Captcha";
import ThankYouModal from "../../../../components/ThankYouModal";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("booking");
  const [isExpanded, setIsExpanded] = useState(false);
  const [areFieldsEnabled, setAreFieldsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    serviceType: "",
    email: "",
    message: "",
    refererUrl: window.location.href,
    submittedUrl: window.location.href,
    trackingNumber: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [error, setError] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
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
        console.log("Enquiry submitted:", response.data);
        setFormData({
          fullName: "",
          phoneNumber: "",
          serviceType: "",
          email: "",
          message: "",
          refererUrl: window.location.href,
          submittedUrl: window.location.href,
          trackingNumber: formData.trackingNumber,
        });
        setRecaptchaToken("");
        setError("");
        setIsExpanded(false);
        setAreFieldsEnabled(false);
        setShowThankYouModal(true);
      })
      .catch((error) => {
        setError("Enquiry submission failed. Please try again.");
        console.error("Enquiry submission error:", error);
      });
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

  const handleFullNameClick = () => {
    setIsExpanded(true);
    setAreFieldsEnabled(true);
  };

  const handleCloseExpandedForm = () => {
    setIsExpanded(false);
    setAreFieldsEnabled(false);
  };

  const serviceOptions = [
    { value: "localMove", label: "Local Move" },
    { value: "internationalMove", label: "International Move" },
    { value: "carExport", label: "Car Import and Export" },
    { value: "storageServices", label: "Storage Services" },
    { value: "logistics", label: "Logistics" },
  ];

  return (
    <div className="container-primary w-full">
      <div
        className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] bg-cover bg-center flex flex-col justify-center items-center text-center text-white mx-0 px-0 sm:px-6 md:px-8 rounded-b-3xl rounded-t-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      >
        <div
          className="absolute inset-0 rounded-b-3xl rounded-t-none"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(76, 112, 133, 0.8), rgba(0,0,0, 0.3))`,
          }}
        ></div>
        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto pt-12 sm:pt-16 md:pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 space-y-4 sm:space-y-5 px-4 sm:px-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div>
              <span className="text-white">ISO Certified Moving Company in </span>
              <span className="text-yellow-400">Qatar? </span>
            </div>
            <div>
              <span className="text-white">We Make Your Relocation </span>
              <span className="text-yellow-400">Easy and Safe!</span>
            </div>
            <div className="text-gray-100 font-normal text-base sm:text-lg md:text-xl">
              Qatar’s Most Trusted Experts in Local & International Relocation,<br />
              Delivering Seamless and Reliable Moving Solutions.
            </div>
          </motion.h1>
          <motion.div
            className="w-full bg-white/50 rounded-3xl shadow-lg shadow-black/30 mb-6 mx-auto relative overflow-hidden max-w-[90%] sm:max-w-4xl px-4 sm:px-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {isExpanded && (
              <button
                onClick={handleCloseExpandedForm}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-900 hover:text-gray-600 focus:outline-none"
                aria-label="Close expanded form"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
            )}
            <div className="p-4 sm:p-6">
              <div className="flex justify-center gap-2 sm:gap-4">
                <button
                  onClick={() => {
                    setActiveTab("booking");
                    setIsExpanded(false);
                    setAreFieldsEnabled(false);
                    setTrackingResult(null);
                    setError("");
                  }}
                  className={`text-sm sm:text-base font-medium cursor-pointer rounded-xl px-4 sm:px-6 py-1 sm:py-2 ${activeTab === "booking"
                    ? "text-black border-b-4 border-gray-900 bg-white"
                    : "text-gray-600 bg-white/80"
                    } transition-colors`}
                >
                  Booking With Us
                </button>
                <button
                  onClick={() => {
                    setActiveTab("tracking");
                    setIsExpanded(false);
                    setAreFieldsEnabled(false);
                    setError("");
                  }}
                  className={`text-sm sm:text-base font-medium cursor-pointer rounded-xl px-4 sm:px-6 py-1 sm:py-2 ${activeTab === "tracking"
                    ? "text-black border-b-4 border-gray-900 bg-white"
                    : "text-gray-600 bg-white/80"
                    } transition-colors`}
                >
                  Track Your Move
                </button>
              </div>
              <div className="border-t border-white/50 -mx-4 sm:-mx-6 mt-4 sm:mt-6"></div>

              {activeTab === "booking" ? (
                <div className={`pt-4 sm:pt-6 ${!isExpanded ? "pb-0" : "pb-4"}`}>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <FormField
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onClick={handleFullNameClick}
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <FormField
                        type="number"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        disabled={!areFieldsEnabled}
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <FormField
                        type="select"
                        name="serviceType"
                        placeholder="Service Type"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        options={serviceOptions}
                        disabled={!areFieldsEnabled}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                          <FormField
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <FormField
                          type="textarea"
                          name="message"
                          placeholder="Message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <Captcha setRecaptchaToken={setRecaptchaToken} />
                      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                      <div className="mt-4">
                        <Button
                          label="Get a quote"
                          icon="ArrowUpRight"
                          className="bg-yellow-400 text-black rounded-2xl px-4 py-2 sm:px-4 sm:py-3 text-base sm:text-lg hover:bg-white hover:text-gray-900 transition-colors w-full sm:w-auto"
                          onClick={handleFormSubmit}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center p-2">
                  <div className="flex-1 min-w-[200px]">
                    <FormField
                      type="text"
                      name="trackingNumber"
                      icon=""
                      placeholder="Tracking Number"
                      value={formData.trackingNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button
                    label="Track"
                    icon="ArrowUpRight"
                    className="w-full sm:w-auto bg-yellow-400 text-black text-base sm:text-lg rounded-2xl px-4 py-2 sm:px-4 sm:py-3 hover:bg-white hover:text-gray-900 transition-colors"
                    onClick={handleTrackingSubmit}
                  />
                </div>
              )}
            </div>
            {
              trackingResult && activeTab === "tracking" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white -mt-6 p-6 text-gray-700 rounded-lg shadow-md max-w-[90%] sm:max-w-4xl mx-auto"
                >
                  <h2 className="text-2xl font-bold mb-4 text-center">Tracking Details</h2>
                  {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                  {/* Table for Tracking Information */}
                  <div className="mb-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300">
                        <thead className="text-xs">
                          <tr className="bg-gray-100">
                            <th className="px-4 py-2 font-semibold text-center">Tracking ID</th>
                            <th className="px-4 py-2 font-semibold text-center">Cargo Type</th>
                            <th className="px-4 py-2 font-semibold text-center">Customer Name</th>
                            <th className="px-4 py-2 font-semibold text-center">Receiver Name</th>
                            <th className="px-4 py-2 font-semibold text-center">Contact Number</th>
                            <th className="px-4 py-2 font-semibold text-center">Email</th>
                            <th className="px-4 py-2 font-semibold text-center">Recipient Address</th>
                            <th className="px-4 py-2 font-semibold text-center">Recipient Country</th>
                            <th className="px-4 py-2 font-semibold text-center">Commodity</th>
                            <th className="px-4 py-2 font-semibold text-center">Number of Packages</th>
                            <th className="px-4 py-2 font-semibold text-center">Weight</th>
                            <th className="px-4 py-2 font-semibold text-center">Volume</th>
                            <th className="px-4 py-2 font-semibold text-center">Origin</th>
                            <th className="px-4 py-2 font-semibold text-center">Destination</th>
                            <th className="px-4 py-2 font-semibold text-center">Cargo Reference Number</th>
                            <th className="px-4 py-2 font-semibold text-center">Collection Date</th>
                            <th className="px-4 py-2 font-semibold text-center">Time of Departure</th>
                            <th className="px-4 py-2 font-semibold text-center">Time of Arrival</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          <tr className="border-b">
                            <td className="px-4 py-2 text-left">{trackingResult.tracking_id}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.cargo_type}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.customer.name}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.receiver_name}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.contact_number}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.email}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.recipient_address}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.recipient_country}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.commodity}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.number_of_packages}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.weight} kg</td>
                            <td className="px-4 py-2 text-left">{trackingResult.volume} m³</td>
                            <td className="px-4 py-2 text-left">{trackingResult.origin}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.destination}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.cargo_ref_number}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.collection_date}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.time_of_departure}</td>
                            <td className="px-4 py-2 text-left">{trackingResult.time_of_arrival}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Table for Status Updates */}
                  <div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300">
                        <thead className="text-xs">
                          <tr className="bg-gray-100">
                            <th className="px-4 py-2 font-semibold text-center">Status</th>
                            <th className="px-4 py-2 font-semibold text-center">Date</th>
                            <th className="px-4 py-2 font-semibold text-center">Time</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          {trackingResult.status_updates.length > 0 ? (
                            trackingResult.status_updates.map((update) => (
                              <tr key={update.id} className="border-b">
                                <td className="px-4 py-2 text-left">{update.status_content}</td>
                                <td className="px-4 py-2 text-left">{update.status_date}</td>
                                <td className="px-4 py-2 text-left">{update.status_time}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="px-4 py-2 text-left">
                                No status updates available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )
            }
          </motion.div>
        </motion.div>
      </div>
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        from="enquiry"
      />
    </div>
  );
};

export default Hero;