import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const cardStyle = {
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.2s',
    width: '200px',
    height: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    margin: 'auto',
    marginTop: '50px',
    maxWidth: '1200px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={cardContainerStyle}>
        <Link to="/AddJob" style={{ textDecoration: 'none' }}>
          <div style={cardStyle} className="bg-primary">
            <h3>Add Job</h3>
          </div>
        </Link>
        <Link to="/AddCustomerForm" style={{ textDecoration: 'none' }}>
          <div style={cardStyle} className="bg-primary">
            <h3>Add Customer</h3>
          </div>
        </Link>
        <Link to="/ManageJobs" style={{ textDecoration: 'none' }}>
          <div style={cardStyle} className="bg-primary">
            <h3>Manage Jobs</h3>
          </div>
        </Link>
        <Link to="/ManageCustomers" style={{ textDecoration: 'none' }}>
          <div style={cardStyle} className="bg-primary">
            <h3>Manage Customers</h3>
          </div>
        </Link>
        <Link to="/Enquiries" style={{ textDecoration: 'none' }}>
          <div style={cardStyle} className="bg-primary">
            <h3>Enquiries</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
