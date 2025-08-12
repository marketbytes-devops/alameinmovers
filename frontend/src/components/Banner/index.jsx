import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Button from "../Button";
import ModalForm from "../ModalForm";

const Banner = ({
  bannerImage,
  titleFirst,
  titleSecond,
  smallText,
  mainRoute,
  subRoute,
  subRoutePath,
  date,
  time,
  author,
  showSocialIcons = false,
  enquireButton = false, // Add default value for enquireButton
}) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = () => {
    const currentUrl = window.location.href;
    if (navigator.share) {
      navigator.share({ title: document.title, url: currentUrl })
        .then(() => console.log("Share successful"))
        .catch(err => console.error("Share failed: ", err));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <>
      <div className="container-primary w-full">
        <div
          className="relative w-full min-h-[380px] lg:min-h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-2 sm:px-3"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)),
            url(${bannerImage})
          `,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
          }}
        >
          <motion.div
            className="relative -top-4 sm:-top-4 md:-top-0 lg:-top-0 xl:-top-0 z-20 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl banner-title text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
            >
              <span className="text-secondary">{titleFirst}</span>{" "}
              <span className="text-white">{titleSecond}</span>
            </motion.h1>
            {smallText && (
              <motion.p
                className="text-gray-100 mt-4 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
              >
                {smallText}
              </motion.p>
            )}
          </motion.div>
          {enquireButton && ( // Conditionally render the button
            <motion.div
              className="pt-0 md:pt-6 pb-0 sm:pb-0 md:pb-3 lg:pb-3 mb-4 sm:mb-4 lg:mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Button
                label="Enquire Now"
                icon="ArrowUpRight"
                className="mt-6 md:mt-0 bg-secondary text-black rounded-2xl px-4 py-2 text-base hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button"
                onClick={() => setIsModalOpen(true)}
              />
            </motion.div>
          )}

          <motion.div
            className="absolute bottom-0 w-full py-4"
            style={{
              background:
                "linear-gradient(to right, rgba(100, 100, 100, 0.7), rgba(150, 150, 150, 0.7))",
              marginLeft: "calc(-50vw + 50%)",
              marginRight: "calc(-50vw + 50%)",
            }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex md:hidden lg:hidden xl:hidden flex-wrap justify-center gap-2 sm:gap-3 banner-breadcrumbs text-xs">
              <Link
                to="/"
                className="text-gray-100 hover:text-secondary transition-colors duration-300 uppercase"
                aria-label={`Navigate to ${mainRoute}`}
              >
                {mainRoute}
              </Link>
              <span className="mx-1 text-secondary">/</span>
              <Link
                to={subRoutePath}
                className={`transition-colors duration-300 uppercase ${
                  location.pathname === subRoutePath
                    ? "text-secondary"
                    : "text-gray-100 hover:text-secondary"
                }`}
                aria-label={`Navigate to ${subRoute}`}
              >
                {subRoute}
              </Link>
            </div>

            <div className="hidden md:flex lg:flex xl:flex flex-wrap justify-center gap-2 sm:gap-3 banner-breadcrumbs text-sm sm:text-base">
              <Link
                to="/"
                className="text-gray-100 hover:text-secondary transition-colors duration-300 uppercase"
                aria-label={`Navigate to ${mainRoute}`}
              >
                {mainRoute}
              </Link>
              <span className="mx-1 text-secondary">/</span>
              <Link
                to={subRoutePath}
                className={`transition-colors duration-300 uppercase ${
                  location.pathname === subRoutePath
                    ? "text-secondary"
                    : "text-gray-100 hover:text-secondary"
                }`}
                aria-label={`Navigate to ${subRoute}`}
              >
                {subRoute}
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-14 lg:bottom-4 left-2 lg:left-8 flex gap-2 md:gap-4 lg:gap-4 xl:gap-4 z-20 banner-meta text-xs lg:text-sm text-white"
            animate={{ opacity: 1, y: 0 }}
          >
            {author && <span>By {author}</span>}
            <div className="-ml-3 hidden lg:block">
              {author && (date || time) && <span> | </span>}
              {date && <span>{date}</span>}
              {date && time && <span> | </span>}
              {time && <span>{time}</span>}
            </div>
          </motion.div>
          <div className="absolute text-[10px] bottom-[18px] left-2 block lg:hidden">
            {date && <span>{date}</span>}
            {date && time && <span> | </span>}
            {time && <span>{time}</span>}
          </div>
          {showSocialIcons && (
            <>
              <motion.div
                className="hidden md:flex lg:flex xl:flex absolute bottom-14 lg:bottom-4 right-2 lg:right-4 gap-4 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <button
                  onClick={handleShare}
                  className="text-white hover:text-secondary transition-colors duration-300"
                  aria-label="Share this page"
                >
                  <ExternalLink size={20} />
                </button>
              </motion.div>

              <motion.div
                className="flex md:hidden lg:hidden xl:hidden absolute bottom-4 lg:bottom-4 right-2 lg:right-8 gap-4 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <button
                  onClick={handleShare}
                  className="text-white hover:text-secondary transition-colors duration-300"
                  aria-label="Share this page"
                >
                  <ExternalLink size={16} />
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Banner;