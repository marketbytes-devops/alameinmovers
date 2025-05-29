import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AlmasLogo from "../../../../assets/watermark.svg";
import TitleDescription from "../../../../components/TitleDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"; 
import FA from "../../../../assets/home/Fatima.webp"
import AK from "../../../../assets/home/Ahmedk.webp"
import SM from "../../../../assets/home/Sarah.webp"
import KS from "../../../../assets/home/Khalid.webp"
import RT from "../../../../assets/home/Reem.webp"

const reviewCard = [
   {
    id: "1",
    person: FA,
    title: "Fatima A",
    role: "Al Khor",
    description:
      "Almas Mover handled my office relocation with precision and professionalism. They worked efficiently and minimized downtime for our business. Truly a reliable moving partner in Qatar.",
 
    stars: 5,
    date: "23 June 2025",
  },
  {
    id: "2",
    person: AK,
    title: "Ahmed K",
    role: "Al Wakrah",
    description:
      "I was impressed by the efficiency and friendliness of Almas Mover’s staff. They handled everything with great attention to detail and made sure my move was completed on time. Excellent service!",
    stars: 4,
    date: "07 January 2025",
  },
  {
    id: "3",
    person: SM,
    title: "Sarah S",
    role: "Al Jumail",
    description:
      "From packing to unloading, Almas Mover International exceeded my expectations. Their communication was clear, and the entire process was seamless. I wouldn’t trust anyone else with my move.",
    stars: 4,
    date: "26 January 2025",
  },
  {
    id: "4",
    person: KS,
    title: "Khalid S",
    role: "Doha",
    description:
      "Moving can be stressful, but Almas Mover International made it so easy. Their team was careful, professional, and respectful. Great value for money and highly recommended in Qatar!",
    stars: 5,
    date: "16 February 2025",
  },
  {
    id: "5",
    person: RT,
    title: "Reem T",
    role: "Abu Dhalouf",
    description:
      "Almas Mover handled my office relocation with precision and professionalism. They worked efficiently and minimized downtime for our business. Truly a reliable moving partner in Qatar.",
    stars: 4,
    date: "31 March 2025",
  },
 
 
];
 
const Review = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
 
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "5px",
        },
      },
    ],
  };
 
  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => (
      index < count ? (
        <svg
          key={index}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 sm:w-4 h-3 sm:h-4 mr-1"
        >
          <path
            d="M3.228 15.1829L4.468 9.86989L0.345001 6.29789L5.776 5.82789L7.903 0.816895L10.03 5.82689L15.46 6.29689L11.337 9.86889L12.578 15.1819L7.903 12.3619L3.228 15.1829Z"
            fill="#FFD31D"
          />
        </svg>
      ) : (
        <svg
          key={index}
          width="17"
          height="15"
          viewBox="0 0 17 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 sm:w-4 h-3 sm:h-4 mr-1"
        >
          <path
            d="M5.30998 12.8249L8.45998 10.9249L11.61 12.8499L10.785 9.24988L13.56 6.84988L9.90998 6.52488L8.45998 3.12488L7.00998 6.49988L3.35998 6.82488L6.13498 9.24988L5.30998 12.8249ZM3.78498 14.9229L5.02498 9.60988L0.901978 6.03788L6.33298 5.56788L8.45998 0.556885L10.587 5.56688L16.017 6.03688L11.894 9.60888L13.135 14.9219L8.45998 12.1019L3.78498 14.9229Z"
            fill="#FFD31D"
          />
        </svg>
      )
    ));
  };
 
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
 
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
 
  return (
    <div className="slider-container pb-12 sm:pb-20">
      <TitleDescription
        title="Moving Stories"
        titleClass="text-3xl text-black py-2"
      />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
        <p className="text-gray-600 text-base sm:text-base text-center sm:text-left mt-5">
         Delivering excellence to every move, ready to do the same for you!
        </p>
      </div>
      <div className="relative">
        <Slider {...settings} ref={sliderRef}>
          {reviewCard.map((review, index) => (
            <div key={review.id} className="card-container w-full px-0 sm:px-0 md:px-2 lg:px-2 py-0 sm:py-0 md:py-4">
              <div
                className={`review-card relative w-full py-8 sm:py-12 pb-12 sm:pb-16 space-y-4 px-4 mb-16 sm:mb-16 md:mb-0 lg:mb-0 xl:mb-0 rounded-3xl shadow-lg overflow-hidden ${
                  index === currentSlide % reviewCard.length
                    ? "bg-gradient-to-br from-primary to-gray-700"
                    : "bg-gradient-to-br from-[#c0c0c0] to-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="relative inline-block">
                        <img src={review.person} alt={review.title} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p
                      className="text-base sm:text-lg font-semibold text-white"
                    >
                      {review.title}
                    </p>
                    <p
                      className="text-xs sm:text-sm text-white"
                    >
                      {review.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">{renderStars(review.stars)}</div>
                <div>
                  <p
                    className="text-xs sm:text-sm text-white"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                  >
                    {review.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p
                    className="text-xs sm:text-sm text-secondary"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                  >
                    {review.date}
                  </p>
                </div>
              <div className="absolute bottom-[-3rem] sm:bottom-[-3rem] lg:bottom-[-8rem] left-1/2 -translate-x-1/2">
                <img
                  src={AlmasLogo}
                  alt="Almas Logo"
                  className="w-40 sm:w-56 lg:w-80 h-40 sm:h-56 lg:h-80 opacity-90 object-contain"
                />
              </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="navigation-buttons flex justify-center items-center absolute -bottom-[6px] sm:-bottom-[6px] md:-bottom-[80px] lg:-bottom-[80px] xl:-bottom-[80px] left-0 right-0">
          <button
            onClick={handlePrev}
            className="nav-button mx-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label="Previous slide"
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-gray-800 text-lg sm:text-xl"
            />
          </button>
          <button
            onClick={handleNext}
            className="nav-button mx-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label="Next slide"
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-gray-800 text-lg sm:text-xl"
            />
          </button>
        </div>
      </div>
      <style>
        {`
          /* Consistent card sizing */
          .review-card {
            height: 400px;
            display: flex;
            flex-direction: column;
            transition: all 0.5s ease;
          }
         
          /* Scale up animation during sliding */
          .slick-slide {
            z-index: 1;
            opacity: 0.8;
            transform: scale(0.9);
            transition: all 0.5s ease;
          }
         
          .slick-active {
            opacity: 0.9;
            transform: scale(0.95);
          }
         
          .slick-center {
            z-index: 10;
            opacity: 1;
            transform: scale(1.05);
          }
         
          /* Navigation button styling */
          .nav-button {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Poppins', sans-serif;
          }
         
          @media (max-width: 640px) {
            .review-card {
              height: 280px;
            }
           
            .slick-slide {
              padding: Goldberg 2px;
              transform: scale(0.95);
            }
           
            .slick-center {
              transform: scale(1);
            }
           
            .nav-button {
              width: 32px;
              height: 32px;
            }
           
            .nav-button svg {
              font-size: 16px;
            }
          }
         
          @media (min-width: 641px) and (max-width: 1024px) {
            .review-card {
              height: 300px;
            }
           
            .slick-slide {
              padding: 0 4px;
              transform: scale(0.92);
            }
           
            .slick-center {
              transform: scale(1.02);
            }
          }
        `}
      </style>
    </div>
  );
};
 
export default Review;