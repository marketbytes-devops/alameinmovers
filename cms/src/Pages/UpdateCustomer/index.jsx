import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";

const countriesData = {
  countries: [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
    "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
    "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay",
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ]
};

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
  const [countries, setCountries] = useState(countriesData.countries);
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

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmissionStatus(null);
    console.log("Form data updated:", { ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    try {
      console.log("Submitting update for customer ID:", id, "Data:", formData);
      const response = await apiClient.put(`customers/add-customers/${id}/`, formData);
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
              type="number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              onFocus={() => handleFocus("phone_number")}
              onBlur={() => handleBlur("phone_number")}
              required
              className={inputClasses("phone_number")}
              placeholder="+97412345678"
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