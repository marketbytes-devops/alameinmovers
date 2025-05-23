import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get("customers/add-customers/");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          // Sort by id descending (newest first) as default
          const sortedCustomers = response.data.sort((a, b) => b.id - a.id);
          setCustomers(sortedCustomers);
          setFilteredCustomers(sortedCustomers);
        } else {
          console.error("Expected an array but got:", response.data);
          setCustomers([]);
          setFilteredCustomers([]);
        }
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.status === 401
            ? "Unauthorized: Please log in again"
            : err.response?.data?.detail || "Failed to fetch customers";
        console.error("Fetch customers error:", errorMessage);
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle search
  useEffect(() => {
    let result = [...customers];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.phone_number.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query)
      );
    }

    setFilteredCustomers(result);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery, customers]);

  const handleEdit = (id) => {
    console.log(`Navigating to edit customer with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      console.log(`Deleting customer with ID: ${id}`);
      await apiClient.delete(`customers/add-customers/${id}/`);
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
      setNotification({ type: "success", message: "Customer deleted successfully!" });
      console.log(`Customer with ID ${id} deleted`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.status === 401
          ? "Unauthorized: Please log in again"
          : err.response?.status === 404
          ? `Customer with ID ${id} not found`
          : err.response?.data?.detail || "Failed to delete customer";
      console.error("Delete customer error:", errorMessage);
      setNotification({ type: "error", message: errorMessage });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="flex justify-center items-center text-2xl font-extrabold mb-6 text-gray-800">
        Manage Customers
      </h2>
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
            Search
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Name, Phone, or Email"
            className="w-full md:w-80 p-3 font-poppins text-base font-light border border-gray-300 rounded outline-none bg-gray-100 transition-colors"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Serial Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Email ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Country
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Edit
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((customer, index) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{customer.phone_number}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{customer.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{customer.address}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">{customer.country}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">
                  <Link to={`/update-customer/${customer.id}`}>
                    <button
                      onClick={() => handleEdit(customer.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 border-b">
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"}`}
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

export default ManageCustomers;
