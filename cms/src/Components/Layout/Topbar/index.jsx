import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import { FaHome, FaChevronDown, FaPowerOff, FaBars, FaTimes } from 'react-icons/fa';

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUserRole(role);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCustomersOpen(false);
    setIsJobsOpen(false);
  };

  const toggleCustomersDropdown = () => {
    setIsCustomersOpen(!isCustomersOpen);
    setIsJobsOpen(false);
  };

  const toggleJobsDropdown = () => {
    setIsJobsOpen(!isJobsOpen);
    setIsCustomersOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    apiClient
      .post('/auth/logout/', {
        refresh: localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token'),
      })
      .then(() => {
        console.log('Logout successful');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_role');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_role');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        navigate('/login');
      });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-end h-24">
          <div className="flex justify-between items-center">
            <Link to="/">
              <FaHome className="w-[87px] h-[50px] text-[#FFD31D]" />
            </Link>
          </div>

          <div className="bg-secondary text-black font-semibold hidden md:flex flex-1 justify-center space-x-10 py-[13px]">
            {userRole === 'user' && (
              <>
                <div className="relative">
                  <button
                    onClick={toggleCustomersDropdown}
                    className={`flex items-center transition-colors duration-200 text-md ${
                      isActive('/add-customer-form') || isActive('/manage-customers')
                        ? 'text-primary'
                        : 'hover:text-primary'
                    }`}
                  >
                    CUSTOMERS
                    <FaChevronDown className="ml-2 w-4 h-3" />
                  </button>
                  {isCustomersOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                      <Link
                        to="/add-customer-form"
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          isActive('/add-customer-form') ? 'bg-gray-200 font-bold' : ''
                        }`}
                        onClick={() => setIsCustomersOpen(false)}
                      >
                        Add Customer
                      </Link>
                      <Link
                        to="/manage-customers"
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          isActive('/manage-customers') ? 'bg-gray-200 font-bold' : ''
                        }`}
                        onClick={() => setIsCustomersOpen(false)}
                      >
                        Manage Customers
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={toggleJobsDropdown}
                    className={`flex items-center transition-colors duration-200 text-md ${
                      isActive('/add-job') || isActive('/manage-jobs')
                        ? 'text-primary'
                        : 'hover:text-primary'
                    }`}
                  >
                    JOBS
                    <FaChevronDown className="ml-2 w-4 h-3" />
                  </button>
                  {isJobsOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                      <Link
                        to="/add-job"
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          isActive('/add-job') ? 'bg-gray-200 font-bold' : ''
                        }`}
                        onClick={() => setIsJobsOpen(false)}
                      >
                        Add Job
                      </Link>
                      <Link
                        to="/manage-jobs"
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          isActive('/manage-jobs') ? 'bg-gray-200 font-bold' : ''
                        }`}
                        onClick={() => setIsJobsOpen(false)}
                      >
                        Manage Jobs
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
            {userRole === 'admin' && (
              <Link
                to="/enquiries"
                className={`flex items-center transition-colors duration-200 text-md ${
                  isActive('/enquiries') ? 'text-primary' : 'hover:text-primary'
                }`}
              >
                ENQUIRIES
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center transition-colors duration-200 text-md hover:text-primary"
            >
              <FaPowerOff className="w-[18px] h-[18px] mr-2" />
              <span>Logout</span>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-[#FFD31D] focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-secondary text-black font-semibold">
            {userRole === 'user' && (
              <>
                <button
                  onClick={toggleCustomersDropdown}
                  className={`block px-4 py-2 w-full text-left hover:bg-gray-100 ${
                    isActive('/add-customer-form') || isActive('/manage-customers')
                      ? 'bg-gray-200 font-bold'
                      : ''
                  }`}
                >
                  CUSTOMERS
                </button>
                {isCustomersOpen && (
                  <div>
                    <Link
                      to="/add-customer-form"
                      className={(`block px-4 py-2 pl-8 hover:bg-gray-100 ${
                        isActive('/add-customer-form') ? 'bg-gray-200 font-bold' : ''
                      }`)}
                      onClick={toggleMenu}
                    >
                      Add Customer
                    </Link>
                    <Link
                      to="/manage-customers"
                      className={`block px-4 py-2 pl-8 hover:bg-gray-100 ${
                        isActive('/manage-customers') ? 'bg-gray-200 font-bold' : ''
                      }`}
                      onClick={toggleMenu}
                    >
                      Manage Customers
                    </Link>
                  </div>
                )}
                <button
                  onClick={toggleJobsDropdown}
                  className={`block px-4 py-2 w-full text-left hover:bg-gray-100 ${
                    isActive('/add-job') || isActive('/manage-jobs')
                      ? 'bg-gray-200 font-bold'
                      : ''
                  }`}
                >
                  JOBS
                </button>
                {isJobsOpen && (
                  <div>
                    <Link
                      to="/add-job"
                      className={`block px-4 py-2 pl-8 hover:bg-gray-100 ${
                        isActive('/add-job') ? 'bg-gray-200 font-bold' : ''
                      }`}
                      onClick={toggleMenu}
                    >
                      Add Job
                    </Link>
                    <Link
                      to="/manage-jobs"
                      className={`block px-4 py-2 pl-8 hover:bg-gray-100 ${
                        isActive('/manage-jobs') ? 'bg-gray-200 font-bold' : ''
                      }`}
                      onClick={toggleMenu}
                    >
                      Manage Jobs
                    </Link>
                  </div>
                )}
              </>
            )}
            {userRole === 'admin' && (
              <Link
                to="/enquiries"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  isActive('/enquiries') ? 'bg-gray-200 font-bold' : ''
                }`}
                onClick={toggleMenu}
              >
                ENQUIRIES
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
            >
              <FaPowerOff className="w-6 h-6 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Topbar;