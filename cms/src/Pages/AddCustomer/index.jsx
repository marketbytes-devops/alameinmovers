import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import image1 from "../../assets/image1.svg";

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

const AddCustomerForm = () => {
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
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmissionStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await apiClient.post("customers/add-customers/", formData);
      console.log("Customer added:", response.data);
      setSubmissionStatus({ type: "success", message: "Customer added successfully!" });
      setTimeout(() => {
        navigate("/manage-customers");
      }, 1000);
    } catch (error) {
      console.error("Error adding customer:", error);
      const errorMessage =
        error.response?.status === 404
          ? "API endpoint not found. Please check backend URL configuration."
          : error.response?.data?.detail ||
            Object.values(error.response?.data || {}).flat().join(" ") ||
            "Failed to add customer.";
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
    `w-full p-3 font-poppins text-base font-light border ${
      focusedField[field] ? "border-blue-500" : "border-gray-300"
    } rounded outline-none bg-gray-100 transition-colors`;

  return (
    <div className="container flex justify-center items-start gap-8 max-w-6xl mx-auto p-4 relative">
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="form-container bg-white p-6 max-w-xl w-full flex-1">
        <h2 className="flex justify-center items-center text-2xl font-extrabold mb-6 text-gray-800">
          Add Customers
        </h2>
        {submissionStatus && (
          <div
            className={`mb-4 p-3 rounded ${
              submissionStatus.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submissionStatus.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
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
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group mb-4">
            <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
              Contact Number
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
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group mb-4">
            <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
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
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group mb-4">
            <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
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
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group mb-4">
            <label className="label block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
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
              disabled={isSubmitting}
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
            className={`submit-button block w-32 mx-auto p-3 font-poppins text-base font-medium uppercase text-black bg-white border border-black rounded cursor-pointer hover:bg-gray-100 hover:border-gray-100 transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="image-container flex-1 max-w-xl w-full flex justify-center items-start">
        <img
          src={image1}
          alt="Customer Illustration"
          className="form-image w-full h-auto mt-6"
        />
      </div>
    </div>
  );
};

export default AddCustomerForm;