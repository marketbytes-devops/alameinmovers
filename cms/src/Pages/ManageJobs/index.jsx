import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cargoTypeFilter, setCargoTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const jobResponse = await apiClient.get("jobs/jobs/");
        const sortedJobs = Array.isArray(jobResponse.data)
          ? jobResponse.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          : [];
        setJobs(sortedJobs);
        setFilteredJobs(sortedJobs);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.status === 401
            ? "Unauthorized: Please log in again"
            : err.response?.data?.detail || "Failed to fetch jobs";
        setError(errorMessage);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...jobs];

    if (cargoTypeFilter !== "all") {
      result = result.filter((job) => job.cargo_type === cargoTypeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.tracking_id.toLowerCase().includes(query) ||
          (job.customer?.name?.toLowerCase()?.includes(query) || false) ||
          (job.receiver_name?.toLowerCase()?.includes(query) || false) ||
          (job.cargo_ref_number?.toLowerCase()?.includes(query) || false)
      );
    }

    setFilteredJobs(result);
    setCurrentPage(1);
  }, [searchQuery, cargoTypeFilter, jobs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await apiClient.delete(`jobs/jobs/${id}/`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      setFilteredJobs((prev) => prev.filter((job) => job.id !== id));
      setNotification({ type: "success", message: "Job deleted successfully!" });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.status === 401
          ? "Unauthorized: Please log in again"
          : err.response?.status === 404
          ? `Job with ID ${id} not found`
          : err.response?.data?.detail || "Failed to delete job";
      setNotification({ type: "error", message: errorMessage });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setCargoTypeFilter(e.target.value);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="flex justify-center items-center text-2xl font-extrabold mb-6 text-gray-800">Manage Jobs</h2>
      {notification && (
        <div
          className={`mb-4 p-3 rounded text-center ${
            notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="form-group">
          <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
            Filter by Cargo Type
          </label>
          <select
            value={cargoTypeFilter}
            onChange={handleFilterChange}
            className="w-full md:w-48 p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
          >
            <option value="all">All</option>
            <option value="air">Air Cargo</option>
            <option value="door_to_door">Door To Door Cargo</option>
            <option value="land">Land Cargo</option>
            <option value="sea">Sea Cargo</option>
          </select>
        </div>
        <div className="form-group">
          <label className="block font-poppins text-sm font-medium uppercase text-gray-600 mb-2">
            Search
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Tracking ID, Cargo Ref, Customer, or Recipient"
            className="w-full md:w-80 p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
            aria-label="Search jobs"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md" aria-label="Jobs table">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Serial Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Tracking ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Cargo Ref Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Customer Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Recipient Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Recipient Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Recipient Country</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Edit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((job, index) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{formatDate(job.collection_date)}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{job.tracking_id}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{job.cargo_ref_number || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{job.customer?.name || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{job.receiver_name || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{job.contact_number || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{job.recipient_country}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">
                  <Link to={`/update-job/${job.id}`}>
                    <button className="text-blue-600 hover:text-blue-800 font-medium" aria-label={`Edit job ${job.tracking_id}`}>
                      Edit
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                    aria-label={`Delete job ${job.tracking_id}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;