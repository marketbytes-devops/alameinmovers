import * as React from "react";
import { createBrowserRouter, RouterProvider, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import AddCustomerForm from "./Pages/AddCustomer";
import UpdateCustomer from "./Pages/UpdateCustomer";
import AddJob from "./Pages/AddJob";
import ManageJobs from "./Pages/ManageJobs";
import Enquiries from "./Pages/Enquiries";
import ForgetPassword from "./Pages/ForgetPassword";
import OTPVerification from "./Pages/OTPVerification";
import ResetPassword from "./Pages/ResetPassword";
import Login from "./Pages/Login";
import apiClient from "./api/apiClient";
import ManageCustomers from "./Pages/ManageCustomers";
import UpdateJob from "./Pages/UpdateJobs";

const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    console.log("PrivateRoute checking token:", !!token); 
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
    console.log("App init, token:", !!accessToken, "savedPath:", savedPath); 
    setIsLoggedIn(!!accessToken);
    if (savedPath) {
      setCurrentPath(savedPath);
    }
  }, []);

  const handleLogin = (accessToken, refreshToken) => {
    console.log("Storing tokens:", { accessToken, refreshToken }); 
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
        console.log("Logout successful"); 
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout error:", error); 
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
        { path: "/add-customer-form", element: <PrivateRoute element={<AddCustomerForm />} /> },
        { path: "/update-customer/:id", element: <PrivateRoute element={<UpdateCustomer />} /> },
        { path: "/add-job", element: <PrivateRoute element={<AddJob />} /> },
        { path: "/manage-jobs", element: <PrivateRoute element={<ManageJobs />} /> },
        { path: "/manage-customers", element: <PrivateRoute element={<ManageCustomers />} /> },
        { path: "/update-job/:id", element: <PrivateRoute element={<UpdateJob />} /> }, 
        { path: "/enquiries", element: <PrivateRoute element={<Enquiries />} /> },
      ],
    },
    {
      path: "/login",
      element: <Login onLogin={handleLogin} />,
    },
    {
      path: "/forgot-password",
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