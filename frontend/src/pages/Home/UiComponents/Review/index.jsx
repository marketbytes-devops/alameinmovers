import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AlmasLogo from "../../../../assets/watermark.svg";
import TitleDescription from "../../../../components/TitleDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import person1 from "../../../../assets/review/unnamed-1.png";
import person2 from "../../../../assets/review/unnamed-2.png";
import person3 from "../../../../assets/review/unnamed-3.png";
import person4 from "../../../../assets/review/unnamed-4.png";
import person5 from "../../../../assets/review/unnamed-5.png";
import Button from "../../../../components/Button";


const reviewCard = [
  {
    id: "1",
    person: person1,
    title: "Colleen Mae Sumagaysay",
    role: "Doha",
    description: 'Almas Movers’ team was very professional and helpful. They packed and arranged our things neatly and with care. Kudos to Rishad and his team. Highly recommended!',
    stars: 5,
    date: "03 June 2025",
  },
  {
    id: "2",
    person: person2,
    title: "Muhammad Nasir",
    role: "Doha",
    description: 'Having moved houses quite a few times, I decided to Google for professional home movers and came across Almas...',
    stars: 5,
    date: "10 May 2025",
  },
  {
    id: "3",
    person: person3,
    title: "Hashem Burjaq",
    role: "Doha",
    description: "Absolutely the Best Moving Experience of My Life! I don’t usually write reviews, but Almas Movers absolutely deserve recognition. Having moved several times in my life, I can confidently say this was the smoothest, most professional, and stress-free move I’ve ever experienced by far. In fact, I’d go as far as to say they’re probably the best, if not the best movers I’ve ever worked with...",
    stars: 5,
    date: "03 June 2025",
  },
  {
    id: "4",
    person: person4,
    title: "Ahmad Kaddourah",
    role: "Doha",
    description: 'This is an excellent team, well trained, very professional. The supervisor Anas is very aware of his business and working with a big smile. You will not go wrong with them. This was my first move within Doha and for future movers, I will not choose others...',
    stars: 5,
    date: "10 April 2025",
  },
  {
    id: "5",
    person: person5,
    title: "Venita Vaz",
    role: "Doha",
    description: 'I recently had the pleasure of working with Ashik and his incredible team at Almas Movers for both a local and an international move, and I must say, their service was exceptional. From start to finish, the professionalism and meticulous attention to detail provided by the team made what could have been a stressful experience, completely seamless...',
    stars: 5,
    date: "10 April 2025",
  }
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
      <div className="flex flex-col md:flex-row justify-between items-center sm:items-center md:items-start lg:items-start xl:items-start">
        <div>
          <TitleDescription
            title="Moving Stories"
            titleClass="text-3xl text-black py-2"
          />
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
            <p className="text-gray-600 text-base sm:text-base text-center sm:text-left mt-5">
              Delivering excellence to every move, ready to do the same for you!
            </p>
          </div>
        </div>

        <Button
          label="Read More Stories"
          icon="ArrowUpRight"
          className="mb-8 md:mb-0 bg-secondary text-black rounded-2xl px-4 py-2 text-base hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button"
          onClick={() => window.open("https://www.google.com/maps/place/Almas+Movers+International+%7C+Domestic+%26+International+Moving+Company/@25.2540967,51.5100692,17z/data=!3m1!4b1!4m18!1m9!3m8!1s0x3e45da80e7e1d1df:0x1bdbf7283ef3599e!2sAlmas+Movers+International+%7C+Domestic+%26+International+Moving+Company!8m2!3d25.2540967!4d51.5126441!9m1!1b1!16s%2Fg%2F11b6v4jk_5!3m7!1s0x3e45da80e7e1d1df:0x1bdbf7283ef3599e!8m2!3d25.2540967!4d51.5126441!9m1!1b1!16s%2Fg%2F11b6v4jk_5?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D", "_blank")}
        />
      </div>

      <div className="relative">
        <Slider {...settings} ref={sliderRef}>
          {reviewCard.map((review, index) => (
            <div key={review.id} className="card-container w-full px-0 sm:px-0 md:px-2 lg:px-2 py-0 sm:py-0 md:py-4">
              <div
                className={`review-card relative w-full py-8 sm:py-12 pb-12 sm:pb-16 space-y-4 px-4 mb-16 sm:mb-16 md:mb-0 lg:mb-0 xl:mb-0 rounded-3xl shadow-lg overflow-hidden ${index === currentSlide % reviewCard.length
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
            height: 450px;
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
              height: 350px;
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