import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, useLocation, Navigate } from "react-router-dom";
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

const PrivateRoute = ({ element, allowedRoles = ['admin'] }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");
    if (token && role) {
      setUserRole(role);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
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

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }

  return element;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const savedPath = localStorage.getItem("currentPath");
    const role = localStorage.getItem("user_role");
    console.log("App init, token:", !!accessToken, "savedPath:", savedPath, "role:", role);
    setIsLoggedIn(!!accessToken);
    setUserRole(role);
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
    setUserRole(role);
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
        setUserRole(null);
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
        setUserRole(null);
        window.location.href = "/login";
      });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <PrivateRoute element={<Home />} allowedRoles={["admin", "enquiry"]} /> },
        { path: "/home", element: <PrivateRoute element={<Home />} allowedRoles={["admin", "enquiry"]} /> },
        { path: "/add-customer-form", element: <PrivateRoute element={<AddCustomerForm />} allowedRoles={["admin"]} /> },
        { path: "/update-customer/:id", element: <PrivateRoute element={<UpdateCustomer />} allowedRoles={["admin"]} /> },
        { path: "/add-job", element: <PrivateRoute element={<AddJob />} allowedRoles={["admin"]} /> },
        { path: "/manage-jobs", element: <PrivateRoute element={<ManageJobs />} allowedRoles={["admin"]} /> },
        { path: "/manage-customers", element: <PrivateRoute element={<ManageCustomers />} allowedRoles={["admin"]} /> },
        { path: "/update-job/:id", element: <PrivateRoute element={<UpdateJob />} allowedRoles={["admin"]} /> },
        { path: "/enquiries", element: <PrivateRoute element={<Enquiries />} allowedRoles={["enquiry", "admin"]} /> },
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