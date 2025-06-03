import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaWhatsapp } from 'react-icons/fa';

const Layout = () => {
  const location = useLocation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="fixed top-2 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="main-content mt-16">
        <Outlet />
      </div>
      <div className="mt-16">
        <Footer />
      </div>
      <div className="fixed bottom-[50px] right-3 flex items-center space-x-3 z-[1000]">
        <a
          href="http://wa.me/+97444355663"
          className="relative top-2 bg-green-500 text-white hover:text-white rounded-full w-12 h-12 flex items-center justify-center text-xl cursor-pointer transition-transform duration-300 hover:scale-110 animate-bounce"
          aria-label="Chat on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
        <button
          onClick={scrollToTop}
          className={`bg-primary text-secondary hover:text-white rounded-full w-12 h-12 flex items-center justify-center text-xl cursor-pointer transition-colors duration-300 ${showScrollButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll to top"
        >
          <span className='relative bottom-[2px]'>↑</span>
        </button>
      </div>
    </>
  );
};

export default Layout;
