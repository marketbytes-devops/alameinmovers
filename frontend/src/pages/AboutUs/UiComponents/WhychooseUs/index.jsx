import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import icon1 from "../../../../assets/about/icon.svg";
import icon2 from "../../../../assets/about/icon2.svg";
import icon3 from "../../../../assets/about/icon3.svg";
import TitleDescription from "../../../../components/TitleDescription";

const WhychooseUs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    dotsClass: "slick-dots custom-dots",
    customPaging: (i) => <div className="custom-dot"></div>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10px",
        },
      },
    ],
  };

  const slides = [
    {
      icon: icon1,
      title: "Connected Across Continents",
      description:
        "With a strong global network and deep local knowledge, we ensure smooth moves across borders.",
      alt: "Connected Across Continents",
    },
    {
      icon: icon2,
      title: "Rapid Delivery Commitment",
      description:
        "With a strong global network and deep local knowledge, we ensure smooth moves across borders.",
      alt: "Rapid Delivery Commitment",
    },
    {
      icon: icon3,
      title: "24/7 Support",
      description:
        "We’re here when you need us, day or night. Get real-time updates, answers, and assistance throughout your move.",
      alt: "24/7 Service",
    },
    {
      icon: icon1,
      title: "On-Time, Every Time",
      description:
        "We value your time. Our team is committed to punctuality, ensuring every move is completed on schedule without compromise.",
      alt: "On-Time, Every Time",
    },
    {
      icon: icon2,
      title: "Timely Delivery",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      alt: "Timely Delivery",
    },
  ];

  return (
    <div className="w-full bg-white">
      <div>
        <TitleDescription
          title="Why Choose Us"
          titleClass="text-3xl font-poppins font-normal text-black pb-6 sm:pb-6 lg:pb-10"
        />
        <p className="text-left text-[22px] font-poppins font-medium max-w-full text-gray-900">
         Over 14 Years of Trusted Relocation Excellence
        </p>
        <p className="text-left max-w-full mt-6 mb-10 text-gray-600">
          At Almas Movers International, trust is not claimed, it’s earned, one move at a time. For more than a decade, families and businesses across Qatar and beyond have relied on us for safe, seamless, and professional relocations. Our strength lies in combining internationally recognized standards with a personal, client-first approach. It's this blend of experience, care, and consistency that keeps our clients coming back, and referring us forward.
        </p>
        <Slider {...settings} className="slick-slider">
          {slides.map((slide, index) => (
            <div key={index}>
              <div className="bg-primary/5 p-6 pl-1 card-container flex items-center h-40">
                <div className="icon-container w-[52px] h-[52px] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <img
                    src={slide.icon}
                    alt={slide.alt}
                    className="w-[80px] h-[80px]"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold sm:text-base text-gray-900">
                    {slide.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <style jsx>{`
          .icon-container {
            background-color: #ffffff; /* White background for circle */
          }
          .custom-dots {
            display: flex !important;
            justify-content: center;
            align-items: center;
            padding-top: 10px;
            list-style: none;
            width: 100%;
            position: relative;
          }
          .custom-dots li {
            margin: 0px 1px;
          }
          .custom-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #d1d5db;
            opacity: 0.6;
            transition: background-color 0.3s, opacity 0.3s;
          }
          .custom-dots .slick-active .custom-dot {
            background-color: #ffc107;
            opacity: 1;
          }
          .slick-slider {
            width: 100%;
            position: relative;
            overflow: visible;
          }
          .slick-slide {
            padding: 0 8px; 
          }
          .slick-slide > div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          .card-container {
            max-width: 100%;
            width: 100%;
            margin: 0 auto;
          }
          @media (max-width: 600px) {
            .slick-slide {
              padding: 0 0px; 
            }
            .card-container {
              width: calc(100% - 1rem);
            }
            .text-[20px] {
              font-size: clamp(1rem, 4vw, 1.125rem);
            }
            .text-[16px] {
              font-size: clamp(0.875rem, 3.5vw, 1rem);
            }
            .p-2 {
              padding: clamp(0.5rem, 2vw, 0.75rem);
            }
            .custom-dots li {
              margin: 0 4px;
            }
            .custom-dot {
              width: 10px;
              height: 10px;
            }
          }
          @media (max-width: 400px) {
            .slick-slide {
              padding: 0 2px; 
            }
            .card-container {
              width: calc(100% - 0.75rem);
            }
            .p-2 {
              padding: clamp(0.25rem, 1.5vw, 0.5rem);
            }
            .custom-dots li {
              margin: 0 3px;
            }
            .custom-dot {
              width: 8px;
              height: 8px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default WhychooseUs;