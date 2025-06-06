import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../../api/apiClient';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showRecaptchaToken, setShowRecaptchaToken] = useState(false);

  const SERVICE_TYPE_DISPLAY = {
    localMove: 'Local Move',
    internationalMove: 'International Move',
    carExport: 'Car Import and Export',
    storageServices: 'Storage Services',
    logistics: 'Logistics',
  };

  const fetchEnquiries = (start = '', end = '') => {
    const params = {};
    if (start) params.start_date = start;
    if (end) params.end_date = end;

    apiClient
      .get('contacts/enquiries/', { params })
      .then((response) => {
        const sortedEnquiries = response.data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setEnquiries(sortedEnquiries);
        setError('');
      })
      .catch((error) => {
        setError('Failed to fetch enquiries. Please check your connection or try again.');
        console.error('Fetch enquiries error:', error.response?.data || error.message);
      });
  };

  // const deleteEnquiry = (id) => {
  //   if (window.confirm('Are you sure you want to delete this enquiry?')) {
  //     apiClient
  //       .delete(`contacts/enquiries/${id}/`)
  //       .then(() => {
  //         // Update enquiries list and maintain LIFO order
  //         const updatedEnquiries = enquiries.filter((enquiry) => enquiry.id !== id).sort((a, b) => 
  //           new Date(b.created_at) - new Date(a.created_at)
  //         );
  //         setEnquiries(updatedEnquiries);
  //         setError('');
  //       })
  //       .catch((error) => {
  //         setError('Failed to delete enquiry. Please try again.');
  //         console.error('Delete enquiry error:', error.response?.data || error.message);
  //       });
  //   }
  // };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError('Start date must be before end date.');
      return;
    }
    fetchEnquiries(startDate, endDate);
  };

  const resetFilter = () => {
    setStartDate('');
    setEndDate('');
    setError('');
    fetchEnquiries();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="flex justify-center items-center text-2xl font-extrabold mb-6 text-gray-800">Enquiries</h2>
      <div className="mb-6">
        <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Filter
            </button>
            <button
              type="button"
              onClick={resetFilter}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="mb-4">
        <button
          onClick={() => setShowRecaptchaToken(!showRecaptchaToken)}
          className="text-blue-500 hover:underline"
        >
          {showRecaptchaToken ? 'Hide reCAPTCHA Token' : 'Show reCAPTCHA Token'}
        </button>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Serial Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Date & Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Customer Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Email ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Service Required</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Message</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Referer URL</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Submitted URL</th>
              {showRecaptchaToken && (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">reCAPTCHA Token</th>
              )}
              {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr>
                <td
                  colSpan={showRecaptchaToken ? 11 : 10}
                  className="px-6 py-4 text-center text-sm text-gray-600"
                >
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries.map((enquiry, index) => (
                <motion.tr
                  key={enquiry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{enquiries.length - index}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">
                    {new Date(enquiry.created_at).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{enquiry.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{enquiry.phoneNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{enquiry.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">
                    {SERVICE_TYPE_DISPLAY[enquiry.serviceType] || enquiry.serviceType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{enquiry.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{enquiry.refererUrl}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-b">{enquiry.submittedUrl}</td>
                  {showRecaptchaToken && (
                    <td className="px-6 py-4 text-sm text-gray-600 border-b">
                      {enquiry.recaptchaToken.length > 50
                        ? `${enquiry.recaptchaToken.slice(0, 50)}... (${enquiry.recaptchaToken.length} chars)`
                        : enquiry.recaptchaToken}
                    </td>
                  )}
                  {/* <td className="px-6 py-4 text-sm text-gray-600 border-b">
                    <button
                      onClick={() => deleteEnquiry(enquiry.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td> */}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiries;