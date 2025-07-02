import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const UpdateJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [editingStatus, setEditingStatus] = useState(null);
  const [countries, setCountries] = useState(countriesData.countries);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const customerResponse = await apiClient.get("/customers/add-customers/");
        if (!Array.isArray(customerResponse.data)) throw new Error("Invalid customer data");
        setCustomers(customerResponse.data);
        const jobResponse = await apiClient.get(`jobs/jobs/${id}/`);
        setJobDetails({
          ...jobResponse.data,
          customer_id: jobResponse.data.customer?.id || "",
        });
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

  const validatePhoneNumber = (phone) => {
    if (!phone) return true; // Optional field
    const regex = /^\+?\d{10,15}$/;
    return regex.test(phone);
  };

  const validateCargoRefNumber = (ref) => {
    if (!ref) return true; // Optional field
    const regex = /^[A-Z0-9-]{1,50}$/;
    return regex.test(ref);
  };

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
        job: parseInt(id),
        status_date: new Date().toISOString().split("T")[0],
        status_time: new Date().toTimeString().split(" ")[0].slice(0, 5),
        status_content: newStatus,
      };
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

  const handleEditStatus = (status) => {
    setEditingStatus({
      id: status.id,
      status_content: status.status_content,
      status_date: status.status_date,
      status_time: status.status_time,
    });
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!editingStatus.status_content.trim()) {
      setNotification({ type: "error", message: "Status content cannot be empty" });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    try {
      const updatedStatus = {
        job: parseInt(id),
        status_content: editingStatus.status_content,
        status_date: editingStatus.status_date,
        status_time: editingStatus.status_time,
      };
      const response = await apiClient.put(`jobs/status-updates/${editingStatus.id}/`, updatedStatus);
      setStatusUpdates((prev) =>
        prev.map((status) => (status.id === editingStatus.id ? response.data : status))
      );
      setEditingStatus(null);
      setNotification({ type: "success", message: "Status updated successfully!" });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.status === 401
          ? "Unauthorized: Please log in again"
          : err.response?.status === 404
          ? `Status with ID ${editingStatus.id} not found`
          : err.response?.data?.detail || "Failed to update status";
      setNotification({ type: "error", message: errorMessage });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditingStatus(null);
  };

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

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    if (jobDetails.contact_number && !validatePhoneNumber(jobDetails.contact_number)) {
      setNotification({
        type: "error",
        message: "Invalid phone number format (e.g., +1234567890)",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    if (jobDetails.cargo_ref_number && !validateCargoRefNumber(jobDetails.cargo_ref_number)) {
      setNotification({
        type: "error",
        message: "Cargo Reference Number must be 1-50 characters (letters, numbers, or hyphens).",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
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
        customer_id: parseInt(jobDetails.customer_id) || null,
        receiver_name: jobDetails.receiver_name || null,
        contact_number: jobDetails.contact_number || null,
        email: jobDetails.email,
        recipient_address: jobDetails.recipient_address,
        recipient_country: jobDetails.recipient_country,
        commodity: jobDetails.commodity,
        number_of_packages: parseInt(jobDetails.number_of_packages) || 0,
        weight: parseFloat(jobDetails.weight) || 0.0,
        volume: parseFloat(jobDetails.volume) || 0.0,
        origin: jobDetails.origin,
        destination: jobDetails.destination,
        cargo_ref_number: jobDetails.cargo_ref_number || null,
        collection_date: jobDetails.collection_date,
        date_of_departure: jobDetails.date_of_departure,
        date_of_arrival: jobDetails.date_of_arrival,
      };
      await apiClient.put(`jobs/jobs/${id}/`, submissionData);
      setNotification({ type: "success", message: "Job updated successfully!" });
      setTimeout(() => navigate("/manage-jobs"), 2000);
    } catch (err) {
      const errorMessage =
        err.response?.status === 401
          ? "Unauthorized: Please log in again"
          : err.response?.data?.detail || JSON.stringify(err.response?.data) || "Failed to update job";
      setNotification({ type: "error", message: errorMessage });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditStatusChange = (e) => {
    const { name, value } = e.target;
    setEditingStatus((prev) => ({ ...prev, [name]: value }));
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

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Job Details</h3>
        {jobDetails && (
          <form onSubmit={handleUpdateJob} noValidate>
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="form-group mb-4">
                    <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                      Cargo Reference Number (Optional)
                    </label>
                    <input
                      type="text"
                      name="cargo_ref_number"
                      value={jobDetails.cargo_ref_number || ""}
                      onChange={handleInputChange}
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
                      Receiver Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="receiver_name"
                      value={jobDetails.receiver_name || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                      Contact Number (Optional)
                    </label>
                    <input
                      type="number"
                      name="contact_number"
                      value={jobDetails.contact_number || ""}
                      onChange={handleInputChange}
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
                      Date of Departure
                    </label>
                    <input
                      type="date"
                      name="date_of_departure"
                      value={jobDetails.date_of_departure || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                      Date of Arrival
                    </label>
                    <input
                      type="date"
                      name="date_of_arrival"
                      value={jobDetails.date_of_arrival || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
                >
                  Update Job
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Status Updates</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md" aria-label="Status updates table">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Status Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Status Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Status Content</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
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
                      onClick={() => handleEditStatus(status)}
                      className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                      aria-label={`Edit status ${status.id}`}
                    >
                      Edit
                    </button>
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

      {editingStatus && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-700">Edit Status Update</h3>
          <form onSubmit={handleUpdateStatus} noValidate>
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
              <div className="form-group mb-4">
                <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Status Content
                </label>
                <textarea
                  name="status_content"
                  value={editingStatus.status_content || ""}
                  onChange={handleEditStatusChange}
                  rows="4"
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100 resize-none"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Status Date
                </label>
                <input
                  type="date"
                  name="status_date"
                  value={editingStatus.status_date || ""}
                  onChange={handleEditStatusChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
                  Status Time
                </label>
                <input
                  type="time"
                  name="status_time"
                  value={editingStatus.status_time || ""}
                  onChange={handleEditStatusChange}
                  required
                  className="w-full p-3 font-poppins text-base font-light border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
                >
                  Update Status
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Add New Status</h3>
        <form onSubmit={handleSubmitStatus} noValidate>
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
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
              >
                Add Status
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/manage-jobs")}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 font-medium"
        >
          Back to Manage Jobs
        </button>
      </div>
    </div>
  );
};

export default UpdateJobs;