import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cert1 from "../../../../assets/about/certification1.webp";
import cert2 from "../../../../assets/about/certification2.webp";
import cert3 from "../../../../assets/about/certification3.webp";
import cert4 from "../../../../assets/about/certification4.webp";
import cert5 from "../../../../assets/about/certification5.webp";
import cert6 from "../../../../assets/about/certification6.webp";
import cert7 from "../../../../assets/about/certification7.webp";
import cert8 from "../../../../assets/about/certification8.webp";
import cert9 from "../../../../assets/about/certification9.webp";
import TitleDescription from "../../../../components/TitleDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faTimes } from "@fortawesome/free-solid-svg-icons";

const Certifications = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const certifications = [
    { src: cert1, alt: "Certification 1" },
    { src: cert2, alt: "Certification 2" },
    { src: cert3, alt: "Certification 3" },
    { src: cert4, alt: "Certification 4" },
    { src: cert5, alt: "Certification 5" },
    { src: cert6, alt: "Certification 6" },
    { src: cert7, alt: "Certification 7" },
    { src: cert8, alt: "Certification 8" },
    { src: cert9, alt: "Certification 9" },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        slider.slickNext();
      } else {
        slider.slickPrev();
      }
    };

    const sliderElement = slider.innerSlider.list;
    sliderElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      sliderElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(5);
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    dotsClass: "slick-dots flex justify-center items-center p-0 m-0 list-none",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center items-center space-x-2">
          {dots.slice(0, 5)}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gray-300 cursor-pointer transition-all duration-300 ${
          i === currentSlide % 5 ? "bg-yellow-400 w-3 h-3 sm:w-3 sm:h-3" : ""
        }`}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "5px",
        },
      },
    ],
  };

  const getCenteredSlideIndex = () => {
    const centerIndex = Math.floor(slidesToShow / 2);
    return (currentSlide + centerIndex) % certifications.length;
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setModalImageIndex((prev) => (prev + 1) % certifications.length);
  };

  const handlePrev = () => {
    setModalImageIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  return (
    <div className="w-full pb-6 sm:pb-6 lg:pb-8">
      <div className="mb-8 text-left">
        <TitleDescription title="Certifications & Memberships" titleClass="text-3xl" />
      </div>
      <Slider ref={sliderRef} {...settings} className="mx-0">
        {certifications.map((cert, index) => {
          const isCentered = index === getCenteredSlideIndex();
          const isAdjacentToCenter = Math.abs(index - getCenteredSlideIndex()) === 1;
          return (
            <div
              key={index}
              className={`px-1 flex justify-center mb-10 ${
                isCentered ? "px-4" : isAdjacentToCenter ? "px-2" : "px-1"
              }`}
            >
              <div className="transition-all duration-300 ease-in-out flex justify-center">
                <div
                  className={`flex items-center justify-center bg-[#F3F7F8] shadow-[4px_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 h-[120px] cursor-pointer ${
                    isCentered
                      ? "transform scale-125 z-10 p-4 w-[150%]"
                      : "transform scale-100 opacity-90 p-4 w-full"
                  }`}
                  onClick={() => openModal(index)}
                >
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="object-contain w-full h-full transition-transform duration-300 p-2"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-1.5 nav-button mx-2 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-800 text-lg sm:text-xl" />
            </button>
            <div className="flex items-center justify-center h-[40vh] md:h-[50vh]">
              <img
                src={certifications[modalImageIndex].src}
                alt={certifications[modalImageIndex].alt}
                className="object-fill max-w-full max-h-full"
              />
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              <button
                onClick={handlePrev}
                className="nav-button mx-2 px-4 py-2.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Previous slide"
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="text-gray-800 text-lg sm:text-xl"
                />
              </button>
              <button
                onClick={handleNext}
                className="nav-button mx-2 px-4 py-2.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Next slide"
              >
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="text-gray-800 text-lg sm:text-xl"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;