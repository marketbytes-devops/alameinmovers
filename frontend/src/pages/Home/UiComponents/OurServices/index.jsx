import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import TitleDescription from "../../../../components/TitleDescription";
import serviceData from "../../../../assets/data/serviceData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../../../../components/Button";

const OurServices = ({ currentSlug }) => {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const cards = serviceData
    .filter((service) => !currentSlug || service.slug !== `/services/${currentSlug}`)
    .map((service) => ({
      id: service.id,
      title: service.title,
      text: service.shortDescription,
      image: service.cardImage,
      slug: service.slug,
    }));

  const getCardDimensions = () => {
    return {
      cardHeight: 280,
      horizontalGap: 16,
      cardsPerRow: 4,
      visibleRows: 1,
    };
  };

  const [dimensions, setDimensions] = useState(getCardDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getCardDimensions());
      setSlidesToShow(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 3 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImageSize = () => {
    return "w-16 h-16";
  };

  const getTotalSlides = () => {
    return Math.ceil(cards.length / slidesToShow);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: slidesToShow, 
    slidesToScroll: slidesToShow, 
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: "slick-dots flex justify-center items-center p-0 m-0 list-none",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center items-center space-x-2">
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => {
      const isActive = Math.floor(currentSlide / slidesToShow) === i;
      return (
        <div
          className={`mt-4 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gray-300 cursor-pointer transition-all duration-300 ${
            isActive ? "bg-yellow-400 w-3 h-3 lg:w-4 lg:h-4" : ""
          }`}
        />
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-8 bg-white">
      <style>
        {`
          .card:hover {
            background-image: linear-gradient(to bottom right, #D1AB0C, #4B708C);
          }
          .card-image {
            transition: transform 0.3s ease;
            object-fit: contain;
          }
          .card:hover .card-image {
            transform: rotateY(180deg);
          }
          .card-content {
            display: flex;
            flex-direction: column;
            height: 100%;
            position: relative;
          }
          .card-arrow {
            position: absolute;
            bottom: -10px;
            left: -3px;
            width: 45px;
            height: 45px;
            background: transparent;
            border-radius: 50%;
            padding: 3px;
            transition: background 0.3s ease;
            cursor: pointer;
          }
          .card:hover .card-arrow {
            background: white;
          }
          .card-arrow svg {
            width: 100%;
            height: 100%;
          }
          .card:hover .card-arrow svg path {
            fill: black;
          }
          .card {
            height: ${dimensions.cardHeight}px;
            margin-right: ${dimensions.horizontalGap}px;
          }
          .slick-slide > div {
            display: flex;
          }
          .slick-track {
            display: flex;
            align-items: stretch;
          }
          .slick-slide {
            height: auto;
          }
          .slick-dots {
            position: relative;
            bottom: -20px;
          }
          @media (max-width: 1023px) {
            .card {
              margin-right: ${dimensions.horizontalGap}px;
            }
          }
          @media (max-width: 639px) {
            .card {
              margin-right: 0;
            }
          }
        `}
      </style>
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center sm:items-center md:items-start lg:items-start xl:items-start mb-6">
          <div>
            <TitleDescription
              title={currentSlug ? "Other Services" : "Our Services"}
              titleClass="text-3xl text-black"
              description="Seamless & Stress-Free Moving Solutions Tailored for You"
              descriptionClass="mt-5 mb-1 px-4 xs:px-4 sm:px-4 md:px-0 lg:px-0 xl:px-0"
            />
          </div>
          <Button
            label="View More"
            icon="ArrowUpRight"
            className="mt-6 md:mt-0 bg-secondary text-black rounded-2xl px-4 py-2 text-base hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button"
            onClick={() => navigate("/service")}
          />
        </div>
        <div className="flex flex-col items-start relative">
          <div ref={gridRef} className="relative w-full pt-2">
            <Slider {...settings}>
              {cards.map((card) => (
                <div key={card.id} className="px-0 xs:px-0 sm:px-0 md:px-2 lg:px-2 xl:px-2">
                  <div
                    className="card bg-gradient-to-br from-gray-400 to-primary rounded-[16px] p-5 sm:p-6"
                    style={{
                      height: `${dimensions.cardHeight}px`,
                    }}
                  >
                    <div className="card-content">
                      <img
                        src={card.image}
                        alt={card.title}
                        className={`card-image mb-4 ${getImageSize()} object-contain`}
                        onError={() => console.log(`Failed to load image: ${card.title}`)}
                      />
                      <h3 className="text-lg sm:text-lg text-white mb-4 capitalize">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 mb-4 flex-grow">
                        {card.text}
                      </p>
                      <Link
                        to={card.slug}
                        className="card-arrow mb-0"
                        aria-label={`View ${card.title} details`}
                      >
                        <svg
                          width="38"
                          height="38"
                          viewBox="0 0 38 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="37"
                            height="37"
                            rx="18.5"
                            fill="none"
                          />
                          <rect
                            x="0.5"
                            y="0.5"
                            width="37"
                            height="37"
                            rx="18.5"
                            stroke="white"
                          />
                          <path
                            d="M15.452 13.5802L16.513 12.5202L22.292 18.2972C22.3851 18.3898 22.4591 18.4999 22.5095 18.6211C22.56 18.7424 22.5859 18.8724 22.5859 19.0037C22.5859 19.1351 22.56 19.2651 22.5095 19.3863C22.4591 19.5076 22.3851 19.6177 22.292 19.7102L16.513 25.4902L15.453 24.4302L20.877 19.0052L15.452 13.5802Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;