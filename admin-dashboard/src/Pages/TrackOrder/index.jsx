
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";

const TrackOrder = () => {
  const { trackingId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await apiClient.get(`/jobs/jobs/?tracking_id=${trackingId}`);
        if (response.data && response.data.length > 0) {
          setJob(response.data[0]); 
        } else {
          setError("No job found with this tracking ID.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch job details.");
        setLoading(false);
      }
    };

    fetchJob();
  }, [trackingId]);

  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="flex justify-center items-center text-2xl font-extrabold mb-6 text-gray-800">
        Track Your Order
      </h2>
      {job && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <p><strong>Tracking ID:</strong> {job.tracking_id}</p>
          <p><strong>Cargo Reference Number:</strong> {job.cargo_ref_number}</p>
          <p><strong>Cargo Type:</strong> {job.cargo_type}</p>
          <p><strong>Customer Name:</strong> {job.customer?.name || "-"}</p>
          <p><strong>Receiver Name:</strong> {job.receiver_name}</p>
          <p><strong>Recipient Country:</strong> {job.recipient_country}</p>
          <p><strong>Origin:</strong> {job.origin}</p>
          <p><strong>Destination:</strong> {job.destination}</p>
          <p><strong>Collection Date:</strong> {job.collection_date}</p>
          <p><strong>Status Updates:</strong></p>
          {job.status_updates && job.status_updates.length > 0 ? (
            <ul className="list-disc pl-5">
              {job.status_updates.map((status, index) => (
                <li key={index}>
                  {status.status_content} - {status.status_date} {status.status_time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No status updates available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;