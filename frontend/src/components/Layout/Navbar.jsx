import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import Logo from "../../assets/logo.webp";
import ModalForm from "../ModalForm";
import serviceData from "../../assets/data/serviceData";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (showPhoneNumber) {
      setShowPhoneNumber(false);
    }
  };

  const handleCallToActionClick = () => {
    setShowPhoneNumber(!showPhoneNumber);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (window.innerWidth >= 1024) {
        setIsScrolled(scrollY > 100);
      }
      if (scrollY > 0) {
        setShowPhoneNumber(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getServiceType = () => {
    const currentService = serviceData.find(
      (service) => service.slug === location.pathname
    );
    if (!currentService) return null;

    const moversServices = [
      "/services/house-moving",
      "/services/office-relocation",
      "/services/vehicle-import-and-export",
      "/services/international-relocation",
      "/services/insurance-coverage",
      "/services/furniture-installation-on-contract",
      "/services/pet-relocations",
      "/services/event-and-exhibition-relocation",
      "/services/storage-solutions-for-household-goods",
    ];

    const logisticsServices = [
      "/services/commercial-storage-solutions",
      "/services/air-freight-services",
      "/services/sea-freight-services",
      "/services/land-freight-services",
    ];

    if (moversServices.includes(currentService.slug)) {
      return "Movers";
    } else if (logisticsServices.includes(currentService.slug)) {
      return "Logistics";
    }
    return null;
  };

  const serviceType = getServiceType();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About Us" },
    {
      to: "/moving-services",
      label: "Moving",
      isActive: serviceType === "Movers" || location.pathname === "/moving-services",
    },
    {
      to: "/logistics-services",
      label: "Logistics",
      isActive:
        serviceType === "Logistics" || location.pathname === "/logistics-services",
    },
    { to: "/track-your-cargo", label: "Track" },
    { to: "/blog", label: "Blogs" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  const menuVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.div
        className="container-primary w-full fixed z-50 top-0"
        animate={{
          top: window.innerWidth >= 1024 && isScrolled ? 0 : window.innerWidth >= 1024 ? 10 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`bg-primary shadow-lg w-full flex items-center justify-between pr-4 sm:pr-6 md:pr-8 lg:pr-16 xl:pr-16 pl-4 sm:pl-6 md:pl-8 lg:pl-24 xl:pl-24 py-2 ${isScrolled
            ? "rounded-t-none rounded-b-none md:rounded-b-3xl md:rounded-t-none"
            : "rounded-t-none rounded-b-none md:rounded-b-none md:rounded-t-3xl"
            }`}
        >
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={Logo}
                alt="Company Logo"
                className="h-12 w-auto sm:h-12 md:h-[70px] px-4 sm:px-4 md:px-0 lg:px-0 xl:px-0"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6 lg:space-x-8 py-2.5 px-8 mx-2 lg:px-10 rounded-3xl border-2 border-gray-300 bg-white/20">
            <ul className="flex space-x-4 lg:space-x-6">
              {navLinks.map((link) => (
                <motion.li
                  key={link.to}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.to}
                    className={`px-0 md:px-0 lg:px-2 text-base sm:text-base md:text-sm font-medium transition-colors duration-300 ${link.isActive || location.pathname === link.to
                      ? "text-secondary"
                      : "text-gray-50 hover:text-secondary"
                      }`}
                    aria-label={`Navigate to ${link.label}`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex pr-6 lg:pr-8">
            <Button
              label="Get a quote"
              icon="ArrowUpRight"
              className="bg-secondary text-black rounded-2xl px-4 py-2 text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <div className="lg:hidden flex items-center justify-center space-x-4">
            <div className="relative">
              <button className="bg-secondary text-black rounded-2xl px-4 py-2 text-sm hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button flex items-center justify-center space-x-2"
                onClick={handleCallToActionClick}
              >
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg>
                </span>
                <span>
                  Talk to us
                </span>
              </button>

              <AnimatePresence>
                {showPhoneNumber && (
                  <motion.div
                    className="absolute top-full w-full mt-2 left-0 bg-white text-black rounded-lg shadow-md p-2 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href="tel:+97444355663"
                      className="text-sm font-medium text-primary hover:underline"
                      aria-label="Call +97444355663"
                    >
                      +97444355663
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={toggleMenu}
              className="text-gray-50 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary rounded-md p-2"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden fixed top-0 left-0 w-full h-screen bg-primary/95 backdrop-blur-md z-40 shadow-md flex flex-col"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-end p-2">
                <button
                  onClick={toggleMenu}
                  className="text-gray-50 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary rounded-md p-2"
                  aria-label="Close navigation menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col space-y-2 px-4 py-2 flex-grow" role="navigation">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.to}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={link.to}
                      className={`text-base font-medium transition-colors duration-300 rounded-md hover:bg-white/10 block px-3 py-1.5 ${link.isActive || location.pathname === link.to
                        ? "text-secondary"
                        : "text-gray-50 hover:text-secondary"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-label={`Navigate to ${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-4"
                >
                  <Button
                    label="Get a quote"
                    icon="ArrowUpRight"
                    className="bg-secondary text-black rounded-2xl px-4 py-2 text-base hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button"
                    onClick={() => setIsModalOpen(true)}
                  />
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-2"
                >
                  <AnimatePresence>
                    {showPhoneNumber && (
                      <motion.div
                        className="mt-2 bg-white text-black rounded-lg shadow-md p-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <a
                          href="tel:+97444355663"
                          className="text-sm font-medium text-primary hover:underline"
                          aria-label="Call +97444355663"
                        >
                          +97444355663
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>
        {`
          .ripple-button {
            position: relative;
            overflow: hidden;
          }

          .ripple-button::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.4s ease, height 0.4s ease;
            pointer-events: none;
          }

          .ripple-button:hover::after {
            width: 200%;
            height: 200%;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;