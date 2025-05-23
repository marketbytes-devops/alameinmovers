import React, { useState } from 'react';

const StatusUpdates = () => {
 
  const [jobDetails, setJobDetails] = useState([
    {
      id: 1,
      jobDate: '2025-05-19',
      recipientName: 'John Doe',
      recipientNumber: '+1-555-123-4567',
      recipientEmail: 'john.doe@example.com',
      recipientCountry: 'USA',
      recipientAddress: '123 Main St, Springfield, IL'
    }
  ]);

 
  const [statusUpdates, setStatusUpdates] = useState([
    {
      id: 1,
      statusDate: '2025-05-19',
      statusTime: '14:30',
      statusContent: 'Package dispatched'
    }
  ]);

  const [newStatus, setNewStatus] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newStatus.trim()) {
      const newStatusUpdate = {
        id: statusUpdates.length + 1,
        statusDate: new Date().toISOString().split('T')[0],
        statusTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
        statusContent: newStatus
      };
      setStatusUpdates([...statusUpdates, newStatusUpdate]);
      setNewStatus('');
    }
  };

 
  const handleDelete = (id) => {
    setStatusUpdates(statusUpdates.filter(status => status.id !== id));
  };

  return (
    <div className="container mx-auto p-16">
     
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Job Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Job Date</th>
                <th className="py-2 px-4 border-b text-left">Recipient Name</th>
                <th className="py-2 px-4 border-b text-left">Recipient Number</th>
                <th className="py-2 px-4 border-b text-left">Recipient Email ID</th>
                <th className="py-2 px-4 border-b text-left">Recipient Country</th>
                <th className="py-2 px-4 border-b text-left">Recipient Address</th>
              </tr>
            </thead>
            <tbody>
              {jobDetails.map((job) => (
                <tr key={job.id}>
                  <td className="py-2 px-4 border-b">{job.jobDate}</td>
                  <td className="py-2 px-4 border-b">{job.recipientName}</td>
                  <td className="py-2 px-4 border-b">{job.recipientNumber}</td>
                  <td className="py-2 px-4 border-b">{job.recipientEmail}</td>
                  <td className="py-2 px-4 border-b">{job.recipientCountry}</td>
                  <td className="py-2 px-4 border-b">{job.recipientAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Status Updates</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Status Date</th>
                <th className="py-2 px-4 border-b text-left">Status Time</th>
                <th className="py-2 px-4 border-b text-left">Status Content</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {statusUpdates.map((status) => (
                <tr key={status.id}>
                  <td className="py-2 px-4 border-b">{status.statusDate}</td>
                  <td className="py-2 px-4 border-b">{status.statusTime}</td>
                  <td className="py-2 px-4 border-b">{status.statusContent}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(status.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

      
      <div>
        <h2 className="text-2xl font-bold mb-4">Add New Status</h2>
        <div className="flex flex-col gap-4">
          <textarea
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            placeholder="Enter new status update"
            className="w-full p-2 border border-gray-300 rounded resize-none"
            rows="4"
          />
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-primary text-white px-4 py-2 rounded whitespace-nowrap"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdates;