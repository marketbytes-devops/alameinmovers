import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Home = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const cardStyle = {
    borderRadius: "8px",
    padding: "20px",
    margin: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.2s",
    width: "200px",
    height: "160px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };

  const cardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    margin: "auto",
    marginTop: "50px",
    maxWidth: "1200px",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={cardContainerStyle}>
        {userRole === "admin" && (
          <>
            <Link to="/add-job" style={{ textDecoration: "none" }}>
              <div style={cardStyle} className="bg-primary font-extrabold">
                <h3>Add Job</h3>
              </div>
            </Link>
            <Link to="/add-customer-form" style={{ textDecoration: "none" }}>
              <div style={cardStyle} className="bg-primary font-extrabold">
                <h3>Add Customer</h3>
              </div>
            </Link>
            <Link to="/manage-jobs" style={{ textDecoration: "none" }}>
              <div style={cardStyle} className="bg-primary font-extrabold">
                <h3>Manage Jobs</h3>
              </div>
            </Link>
            <Link to="/manage-customers" style={{ textDecoration: "none" }}>
              <div style={cardStyle} className="bg-primary font-extrabold">
                <h3>Manage Customers</h3>
              </div>
            </Link>
          </>
        )}
        {(userRole === "enquiry" || userRole === "admin") && (
          <Link to="/enquiries" style={{ textDecoration: "none" }}>
            <div style={cardStyle} className="bg-primary font-extrabold">
              <h3>Enquiries</h3>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;