import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

const UpdateJobs = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [countries, setCountries] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch job details, status updates, countries, and customers
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch countries
        const countryResponse = await fetch("https://restcountries.com/v3.1/all");
        if (!countryResponse.ok) throw new Error("Failed to fetch countries");
        const countryData = await countryResponse.json();
        const countryNames = countryData
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);

        // Fetch customers
        const customerResponse = await apiClient.get("/customers/add-customers/");
        if (!Array.isArray(customerResponse.data)) throw new Error("Invalid customer data");
        setCustomers(customerResponse.data);

        // Fetch job details
        const jobResponse = await apiClient.get(`jobs/jobs/${id}/`);
        setJobDetails({
          ...jobResponse.data,
          customer_id: jobResponse.data.customer?.id || "", // Set customer_id from customer.id
        });

        // Fetch status updates
        const statusResponse = await apiClient.get(`jobs/status-updates/?job_id=${id}`);
        const sortedStatuses = Array.isArray(statusResponse.data)
          ? statusResponse.data.sort((a, b) => new Date(b.status_date) - new Date(a.status_date))
          : [];
        setStatusUpdates(sortedStatuses);

        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.status === 401
            ? "Unauthorized: Please log in again"
            : err.response?.status === 404
            ? `Job with ID ${id} not found`
            : err.response?.data?.detail || "Failed to fetch job data";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Validate phone number
  const validatePhoneNumber = (phone) => {
    const regex = /^\+?\d{10,15}$/;
    return regex.test(phone);
  };

  // Validate cargo reference number
  const validateCargoRefNumber = (ref) => {
    const regex = /^[A-Z0-9-]{1,50}$/;
    return regex.test(ref);
  };

  // Handle adding new status
  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    if (!newStatus.trim()) {
      setNotification({ type: "error", message: "Status content cannot be empty" });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    if (!id || isNaN(parseInt(id))) {
      setNotification({ type: "error", message: "Invalid job ID" });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      const newStatusUpdate = {
        job: parseInt(id), // Ensure job is an integer
        status_date: new Date().toISOString().split("T")[0],
        status_time: new Date().toTimeString().split(" ")[0].slice(0, 5),
        status_content: newStatus,
      };
      console.log("Sending payload:", newStatusUpdate); // Debug log
      const response = await apiClient.post(`jobs/status-updates/`, newStatusUpdate);
      setStatusUpdates((prev) => [response.data, ...prev]);
      setNewStatus("");
      setNotification({ type: "success", message: "Status added successfully!" });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.status === 401
          ? "Unauthorized: Please log in again"
          : err.response?.status === 404
          ? `Job with ID ${id} not found`
          : err.response?.data?.detail || JSON.stringify(err.response?.data) || "Failed to add status";
      setNotification({ type: "error", message: errorMessage });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Handle deleting status
  const handleDeleteStatus = async (statusId) => {
    if (!window.confirm("Are you sure you want to delete this status?")) return;
    try {
      await apiClient.delete(`jobs/status-updates/${statusId}/`);
      setStatusUpdates((prev) => prev.filter((status) => status.id !== statusId));
      setNotification({ type: "success", message: "Status deleted successfully!" });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.status === 401
          ? "Unauthorized: Please log in again"
          : err.response?.status === 404
          ? `Status with ID ${statusId} not found`
          : err.response?.data?.detail || "Failed to delete status";
      setNotification({ type: "error", message: errorMessage });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Handle updating job details
  const handleUpdateJob = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhoneNumber(jobDetails.contact_number)) {
      setNotification({
        type: "error",
        message: "Invalid phone number format (e.g., +1234567890)",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Validate cargo reference number
    if (!validateCargoRefNumber(jobDetails.cargo_ref_number)) {
      setNotification({
        type: "error",
        message: "Cargo Reference Number must be 1-50 characters (letters, numbers, or hyphens).",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Validate customer
    const customerExists = customers.some(
      (customer) => customer.id === parseInt(jobDetails.customer_id)
    );
    if (!customerExists && jobDetails.customer_id) {
      setNotification({
        type: "error",
        message: "Selected customer does not exist. Please choose a valid customer.",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      const submissionData = {
        cargo_type: jobDetails.cargo_type,
        customer: parseInt(jobDetails.customer_id) || null, // Use customer_id
        receiver_name: jobDetails.receiver_name,
        contact_number: jobDetails.contact_number,
        email: jobDetails.email,
        recipient_address: jobDetails.recipient_address,
        recipient_country: jobDetails.recipient_country,
        commodity: jobDetails.commodity,
        number_of_packages: parseInt(jobDetails.number_of_packages) || 0,
        weight: parseFloat(jobDetails.weight) || 0.0,
        volume: parseFloat(jobDetails.volume) || 0.0,
        origin: jobDetails.origin,
        destination: jobDetails.destination,
        cargo_ref_number: jobDetails.cargo_ref_number,
        collection_date: jobDetails.collection_date,
        time_of_departure: jobDetails.time_of_departure,
        time_of_arrival: jobDetails.time_of_arrival,
      };
      await apiClient.put(`jobs/jobs/${id}/`, submissionData);
      setNotification({ type: "success", message: "Job updated successfully!" });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.status === 401
          ? "Unauthorized: Please log in again"
          : err.response?.data?.detail || JSON.stringify(err.response?.data) || "Failed to update job";
      setNotification({ type: "error", message: errorMessage });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Handle input changes for job details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h2 className="flex justify-center items-center text-2xl font-extrabold mb-6 text-gray-800">Update Job</h2>
      {notification && (
        <div
          className={`mb-4 p-3 rounded text-center ${
            notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Job Details Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Job Details</h3>
        {jobDetails && (
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Cargo Reference Number
                  </label>
                  <input
                    type="text"
                    name="cargo_ref_number"
                    value={jobDetails.cargo_ref_number || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                    placeholder="e.g., CARGO-20250521-ABCD"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Cargo Type
                  </label>
                  <select
                    name="cargo_type"
                    value={jobDetails.cargo_type || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  >
                    <option value="" disabled>Select cargo type</option>
                    <option value="air">Air Cargo</option>
                    <option value="door_to_door">Door To Door Cargo</option>
                    <option value="land">Land Cargo</option>
                    <option value="sea">Sea Cargo</option>
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Customer
                  </label>
                  <select
                    name="customer_id"
                    value={jobDetails.customer_id || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  >
                    <option value="" disabled>Select customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    name="receiver_name"
                    value={jobDetails.receiver_name || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact_number"
                    value={jobDetails.contact_number || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={jobDetails.email || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Recipient Address
                  </label>
                  <textarea
                    name="recipient_address"
                    value={jobDetails.recipient_address || ""}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100 resize-y"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Recipient Country
                  </label>
                  <select
                    name="recipient_country"
                    value={jobDetails.recipient_country || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  >
                    <option value="" disabled>Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Commodity
                  </label>
                  <input
                    type="text"
                    name="commodity"
                    value={jobDetails.commodity || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
              </div>
              <div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Number of Packages
                  </label>
                  <input
                    type="number"
                    name="number_of_packages"
                    value={jobDetails.number_of_packages || ""}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={jobDetails.weight || ""}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Volume (m³)
                  </label>
                  <input
                    type="number"
                    name="volume"
                    value={jobDetails.volume || ""}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Origin
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={jobDetails.origin || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={jobDetails.destination || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Collection Date
                  </label>
                  <input
                    type="date"
                    name="collection_date"
                    value={jobDetails.collection_date || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Time of Departure
                  </label>
                  <input
                    type="time"
                    name="time_of_departure"
                    value={jobDetails.time_of_departure || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                    Time of Arrival
                  </label>
                  <input
                    type="time"
                    name="time_of_arrival"
                    value={jobDetails.time_of_arrival || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleUpdateJob}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
              >
                Update Job
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status Updates Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Status Updates</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md" aria-label="Status updates table">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Status Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Status Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Status Content</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {statusUpdates.map((status) => (
                <tr key={status.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{formatDate(status.status_date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{status.status_time}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{status.status_content}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">
                    <button
                      onClick={() => handleDeleteStatus(status.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                      aria-label={`Delete status ${status.id}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Status Section */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-700">Add New Status</h3>
        <div className="flex flex-col gap-4">
          <textarea
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            placeholder="Enter new status update"
            className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100 resize-none"
            rows="4"
            aria-label="New status update"
          />
          <div className="flex justify-center">
            <button
              onClick={handleSubmitStatus}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
            >
              Add Status
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/ManageJobs")}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 font-medium"
        >
          Back to Manage Jobs
        </button>
      </div>
    </div>
  );
};

export default UpdateJobs;