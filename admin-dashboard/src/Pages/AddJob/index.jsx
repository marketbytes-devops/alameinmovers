import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

const AddJobs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cargo_type: "",
    customer_id: "",
    receiver_name: "",
    contact_number: "",
    email: "",
    recipient_address: "",
    recipient_country: "",
    commodity: "",
    number_of_packages: "",
    weight: "",
    volume: "",
    origin: "",
    destination: "",
    cargo_ref_number: "",
    collection_date: "",
    time_of_departure: "",
    time_of_arrival: "",
  });

  const [countries, setCountries] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const countryResponse = await fetch("https://restcountries.com/v3.1/all");
        if (!countryResponse.ok) throw new Error("Failed to fetch countries");
        const countryData = await countryResponse.json();
        const countryNames = countryData
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);

        const customerResponse = await apiClient.get("/customers/add-customers/");
        if (!Array.isArray(customerResponse.data)) throw new Error("Invalid customer data");
        setCustomers(customerResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmissionStatus(null);
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^\+?\d{10,15}$/;
    return regex.test(phone);
  };

  const validateCargoRefNumber = (ref) => {
    const regex = /^[A-Z0-9-]{1,50}$/;
    return regex.test(ref);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_id) {
      setSubmissionStatus({
        type: "error",
        message: "Please select a customer.",
      });
      return;
    }

    const customerId = parseInt(formData.customer_id);
    if (isNaN(customerId)) {
      setSubmissionStatus({
        type: "error",
        message: "Invalid customer selected.",
      });
      return;
    }

    const customerExists = customers.some((customer) => customer.id === customerId);
    if (!customerExists) {
      setSubmissionStatus({
        type: "error",
        message: "Selected customer does not exist. Please choose a valid customer.",
      });
      return;
    }

    if (!validatePhoneNumber(formData.contact_number)) {
      setSubmissionStatus({
        type: "error",
        message: "Invalid phone number format (e.g., +1234567890)",
      });
      return;
    }

    if (!validateCargoRefNumber(formData.cargo_ref_number)) {
      setSubmissionStatus({
        type: "error",
        message: "Cargo Reference Number must be 1-50 characters (letters, numbers, or hyphens).",
      });
      return;
    }

    const submissionData = {
      cargo_type: formData.cargo_type,
      customer_id: customerId, 
      receiver_name: formData.receiver_name,
      contact_number: formData.contact_number,
      email: formData.email,
      recipient_address: formData.recipient_address,
      recipient_country: formData.recipient_country,
      commodity: formData.commodity,
      number_of_packages: parseInt(formData.number_of_packages) || 0,
      weight: parseFloat(formData.weight) || 0.0,
      volume: parseFloat(formData.volume) || 0.0,
      origin: formData.origin,
      destination: formData.destination,
      cargo_ref_number: formData.cargo_ref_number,
      collection_date: formData.collection_date,
      time_of_departure: formData.time_of_departure,
      time_of_arrival: formData.time_of_arrival,
    };

    try {
      console.log("Submitting payload:", submissionData);
      const response = await apiClient.post("jobs/jobs/", submissionData);
      const { tracking_id, cargo_ref_number } = response.data;
      setSubmissionStatus({
        type: "success",
        message: `Job created successfully! Tracking ID: ${tracking_id}, Cargo Ref: ${cargo_ref_number}`,
      });
      setTimeout(() => navigate("/manage-jobs"), 2000);
    } catch (err) {
      const errorMessage =
        err.response?.status === 401
          ? "Unauthorized: Please log in again"
          : err.response?.status === 400
          ? JSON.stringify(err.response?.data) || "Invalid data provided"
          : err.response?.data?.detail || "Failed to create job";
      console.error("Submission error:", errorMessage);
      setSubmissionStatus({ type: "error", message: errorMessage });
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="container max-w-6xl mx-auto p-4">
      <div className="form-container bg-white p-6 w-full">
        <h2 className="flex justify-center items-center text-2xl font-extrabold mb-6 text-gray-800">
          Add New Job
        </h2>
        {submissionStatus && (
          <div
            className={`mb-4 p-3 rounded text-center ${
              submissionStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {submissionStatus.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Cargo Reference Number
                </label>
                <input
                  type="text"
                  name="cargo_ref_number"
                  value={formData.cargo_ref_number}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                  placeholder="e.g., CARGO-20250521-ABCD"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Select Cargo Type
                </label>
                <select
                  name="cargo_type"
                  value={formData.cargo_type}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                >
                  <option value="" disabled>
                    Select cargo type
                  </option>
                  <option value="air">Air Cargo</option>
                  <option value="door_to_door">Door To Door Cargo</option>
                  <option value="land">Land Cargo</option>
                  <option value="sea">Sea Cargo</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Select Customer
                </label>
                <select
                  name="customer_id"
                  value={formData.customer_id}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                >
                  <option value="" disabled>
                    Select customer
                  </option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Receiver Name
                </label>
                <input
                  type="text"
                  name="receiver_name"
                  value={formData.receiver_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Contact Number of Recipient
                </label>
                <input
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Email ID of Recipient
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Recipient Address
                </label>
                <textarea
                  name="recipient_address"
                  value={formData.recipient_address}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors resize-y"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Select Recipient Country
                </label>
                <select
                  name="recipient_country"
                  value={formData.recipient_country}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Commodity
                </label>
                <input
                  type="text"
                  name="commodity"
                  value={formData.commodity}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                />
              </div>
            </div>
            <div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Number of Packages
                </label>
                <input
                  type="number"
                  name="number_of_packages"
                  value={formData.number_of_packages}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                  min="1"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Volume (m³)
                </label>
                <input
                  type="number"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Origin
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Collection Date
                </label>
                <input
                  type="date"
                  name="collection_date"
                  value={formData.collection_date}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Time of Departure
                </label>
                <input
                  type="time"
                  name="time_of_departure"
                  value={formData.time_of_departure}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Time of Arrival
                </label>
                <input
                  type="time"
                  name="time_of_arrival"
                  value={formData.time_of_arrival}
                  onChange={handleChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="submit-button block w-32 mx-auto mt-6 p-3 font-poppins text-base font-medium uppercase text-black bg-white border border-black rounded cursor-pointer hover:bg-gray-100 hover:border-gray-100 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobs;