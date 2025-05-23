import * as React from "react";
import { createBrowserRouter, RouterProvider, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import AddCustomerForm from "./Pages/AddCustomer";
import UpdateCustomer from "./Pages/UpdateCustomer"; // Removed duplicate import
import AddJob from "./Pages/AddJob";
import ManageJobs from "./Pages/ManageJobs";
import Enquiries from "./Pages/Enquiries";
import ForgetPassword from "./Pages/ForgetPassword";
import OTPVerification from "./Pages/OTPVerification";
import ResetPassword from "./Pages/ResetPassword";
import Login from "./Pages/Login";
import apiClient from "./api/apiClient";
import ManageCustomers from "./Pages/ManageCustomers";
import UpdateJob from "./Pages/UpdateJobs"; // Corrected import name (singular)

const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    console.log("PrivateRoute checking token:", !!token); // Debug
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-[#00334d] text-sm">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} replace />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const savedPath = localStorage.getItem("currentPath");
    console.log("App init, token:", !!accessToken, "savedPath:", savedPath); // Debug
    setIsLoggedIn(!!accessToken);
    if (savedPath) {
      setCurrentPath(savedPath);
    }
  }, []);

  const handleLogin = (accessToken, refreshToken) => {
    console.log("Storing tokens:", { accessToken, refreshToken }); // Debug
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    apiClient
      .post("/auth/logout/", {
        refresh: localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token"),
      })
      .then(() => {
        console.log("Logout successful"); // Debug
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout error:", error); // Debug
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
        window.location.href = "/login";
      });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <PrivateRoute element={<Home />} /> },
        { path: "/home", element: <PrivateRoute element={<Home />} /> },
        { path: "/AddCustomerForm", element: <PrivateRoute element={<AddCustomerForm />} /> },
        { path: "/update-customer/:id", element: <PrivateRoute element={<UpdateCustomer />} /> },
        { path: "/AddJob", element: <PrivateRoute element={<AddJob />} /> },
        { path: "/ManageJobs", element: <PrivateRoute element={<ManageJobs />} /> },
        { path: "/ManageCustomers", element: <PrivateRoute element={<ManageCustomers />} /> },
        { path: "/update-job/:id", element: <PrivateRoute element={<UpdateJob />} /> }, // Fixed route
        { path: "/Enquiries", element: <PrivateRoute element={<Enquiries />} /> },
      ],
    },
    {
      path: "/login",
      element: <Login onLogin={handleLogin} />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/otp-verification",
      element: <OTPVerification />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;