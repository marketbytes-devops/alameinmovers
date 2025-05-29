import React, { useState } from "react";
import { motion } from "framer-motion";
import TitleDescription from "../../../../components/TitleDescription";
import Button from "../../../../components/Button";
import FormField from "../../../../components/FormField";
import apiClient from "../../../../api/apiClient"; // Import apiClient for fetching tracking data

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
  const [trackingResult, setTrackingResult] = useState(null); // State for tracking result
  const [error, setError] = useState(""); // State for error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      {trackingResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-black mt-8"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Tracking Details</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="mb-8">
            <div className="overflow-x-auto">
              <table className="bg-white border border-gray-300 text-sm">
                <thead>
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
                <tbody>
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
              <table className="min-w-full bg-white border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 font-semibold text-center">Status</th>
                    <th className="px-4 py-2 font-semibold text-center">Date</th>
                    <th className="px-4 py-2 font-semibold text-center">Time</th>
                  </tr>
                </thead>
                <tbody>
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