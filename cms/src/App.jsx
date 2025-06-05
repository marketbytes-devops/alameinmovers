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

const PrivateRoute = ({ element, allowedRoles }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");
    console.log("PrivateRoute checking token:", !!token, "role:", role);
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-[#00334d] text-sm">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return element;
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

  const handleLogin = (accessToken, refreshToken, role) => {
    console.log("Storing tokens and role:", { accessToken, refreshToken, role });
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user_role", role); 
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
        localStorage.removeItem("user_role"); 
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout error:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_role");
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
        { path: "/", element: <PrivateRoute element={<Home />} allowedRoles={["user", "admin"]} /> },
        { path: "/home", element: <PrivateRoute element={<Home />} allowedRoles={["user", "admin"]} /> },
        { path: "/add-customer-form", element: <PrivateRoute element={<AddCustomerForm />} allowedRoles={["user", "admin"]} /> },
        { path: "/update-customer/:id", element: <PrivateRoute element={<UpdateCustomer />} allowedRoles={["user", "admin"]} /> },
        { path: "/add-job", element: <PrivateRoute element={<AddJob />} allowedRoles={["user", "admin"]} /> },
        { path: "/manage-jobs", element: <PrivateRoute element={<ManageJobs />} allowedRoles={["user", "admin"]} /> },
        { path: "/manage-customers", element: <PrivateRoute element={<ManageCustomers />} allowedRoles={["user", "admin"]} /> },
        { path: "/update-job/:id", element: <PrivateRoute element={<UpdateJob />} allowedRoles={["user", "admin"]} /> },
        { path: "/enquiries", element: <PrivateRoute element={<Enquiries />} allowedRoles={["admin"]} /> },
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
    {
      path: "/unauthorized",
      element: (
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized Access</h2>
            <p className="text-gray-600">You do not have permission to access this page.</p>
            <Link to="/login" className="text-blue-600 hover:underline mt-4 inline-block">
              Back to Login
            </Link>
          </div>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;