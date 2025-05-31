import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
 
const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    address: "",
    country: "",
  });
  const [focusedField, setFocusedField] = useState({
    name: false,
    phone_number: false,
    email: false,
    address: false,
    country: false,
  });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        console.log(`Fetching customer with ID: ${id}`);
        const response = await apiClient.get(`customers/add-customers/${id}/`);
        console.log("Fetched customer data:", response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.status === 404
            ? `Customer with ID ${id} not found`
            : err.response?.status === 401
            ? "Unauthorized: Please log in again"
            : err.response?.data?.detail || "Failed to fetch customer data";
        console.error("Fetch customer error:", errorMessage);
        setError(errorMessage);
        setLoading(false);
      }
    };
 
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        const countryNames = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (err) {
        console.error("Fetch countries error:", err.message);
        setError(err.message);
      }
    };
 
    fetchCustomer();
    fetchCountries();
  }, [id]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmissionStatus(null);
    console.log("Form data updated:", { ...formData, [name]: value });
  };
 
  const validatePhoneNumber = (phone) => {
    const regex = /^\+?\d{10,15}$/;
    return regex.test(phone);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let phone_number = formData.phone_number;
    if (formData.country === "India" && !phone_number.startsWith("+")) {
      phone_number = `+91${phone_number}`;
      setFormData((prev) => ({ ...prev, phone_number }));
    }
    if (!validatePhoneNumber(phone_number)) {
      setSubmissionStatus({
        type: "error",
        message: "Invalid phone number format (e.g., +916385427433 or 6385427433 for India)",
      });
      return;
    }
    setIsSubmitting(true);
    setSubmissionStatus(null);
    try {
      console.log("Submitting update for customer ID:", id, "Data:", { ...formData, phone_number });
      const response = await apiClient.put(`customers/add-customers/${id}/`, {
        ...formData,
        phone_number,
      });
      console.log("Customer updated:", response.data);
      setSubmissionStatus({ type: "success", message: "Customer updated successfully!" });
      setTimeout(() => navigate("/manage-customers"), 1000);
    } catch (error) {
      const errorMessage =
        error.response?.status === 404
          ? "API endpoint not found. Please check backend URL."
          : error.response?.status === 401
          ? "Unauthorized: Please log in again"
          : error.response?.data?.detail ||
            Object.values(error.response?.data || {}).flat().join(" ") ||
            "Failed to update customer.";
      console.error("Update customer error:", errorMessage);
      setSubmissionStatus({ type: "error", message: errorMessage });
      setIsSubmitting(false);
    }
  };
 
  const handleFocus = (field) => {
    setFocusedField((prev) => ({ ...prev, [field]: true }));
  };
 
  const handleBlur = (field) => {
    setFocusedField((prev) => ({ ...prev, [field]: false }));
  };
 
  const inputClasses = (field) =>
    `w-full p-3 font-sans text-base font-light border ${
      focusedField[field] ? "border-blue-500" : "border-gray-300"
    } rounded outline-none bg-gray-100 transition-colors`;
 
  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>;
 
  return (
    <div className="container flex justify-center items-start gap-8 max-w-6xl mx-auto p-4">
      <div className="form-container bg-white p-6 max-w-xl w-full flex-1">
        <h2 className="flex justify-center items-center text-2xl font-extrabold mb-6 text-gray-800">
          Update Customer
        </h2>
        {submissionStatus && (
          <div
            className={`mb-4 p-3 rounded ${
              submissionStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {submissionStatus.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="label block font-sans text-sm font-medium uppercase text-gray-600 mb-2">
              Name of Customer
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              required
              className={inputClasses("name")}
            />
          </div>
          <div className="form-group mb-4">
            <label className="label block font-sans text-sm font-medium uppercase text-gray-600 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              onFocus={() => handleFocus("phone_number")}
              onBlur={() => handleBlur("phone_number")}
              required
              className={inputClasses("phone_number")}
              placeholder={formData.country === "India" ? "6385427433" : "+1234567890"}
            />
          </div>
          <div className="form-group mb-4">
            <label className="label block font-sans text-sm font-medium uppercase text-gray-600 mb-2">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              required
              className={inputClasses("email")}
            />
          </div>
          <div className="form-group mb-4">
            <label className="label block font-sans text-sm font-medium uppercase text-gray-600 mb-2">
              Customer's Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              onFocus={() => handleFocus("address")}
              onBlur={() => handleBlur("address")}
              rows="3"
              required
              className={`${inputClasses("address")} resize-y`}
            />
          </div>
          <div className="form-group mb-4">
            <label className="label block font-sans text-sm font-medium uppercase text-gray-600 mb-2">
              Select Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              onFocus={() => handleFocus("country")}
              onBlur={() => handleBlur("country")}
              required
              className={inputClasses("country")}
              disabled={loading || countries.length === 0}
            >
              <option value="" disabled>
                {loading ? "Loading countries..." : countries.length === 0 ? "Error loading countries" : "Select a country"}
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="submit-button block w-32 mx-auto p-3 font-sans text-base font-medium uppercase text-black bg-white border border-black rounded cursor-pointer hover:bg-gray-100 hover:border-gray-100 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default UpdateCustomer;
 