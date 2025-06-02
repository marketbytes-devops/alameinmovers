import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";

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
      <button
        onClick={scrollToTop}
        className={`fixed bottom-[90px] right-3 bg-primary text-secondary hover:text-white rounded-full w-12 h-12 flex items-center justify-center text-xl cursor-pointer z-[1000] transition-colors duration-300 ${showScrollButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        <span className='relative bottom-[2px]'>
          ↑
        </span>
      </button>
    </>
  );
};

export default Layout;