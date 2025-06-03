import React, { useState, useEffect, useRef } from "react";
import rightImage from "../../../../assets/home/home-aboutus.webp";
import Button from "../../../../components/Button";
import TitleDescription from "../../../../components/TitleDescription";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const [monthlyServices, setMonthlyServices] = useState(0);
  const [deliveriesCompleted, setDeliveriesCompleted] = useState(0);
  const [globalPartners, setGlobalPartners] = useState(0);
  const [onTimeDelivery, setOnTimeDelivery] = useState(0);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const targets = {
    monthlyServices: 14,
    deliveriesCompleted: 20000,
    globalPartners: 120,
    onTimeDelivery: 99,
  };

  const duration = 2000;
  const intervalTime = 50;

  const startCounterAnimation = () => {
    setMonthlyServices(0);
    setDeliveriesCompleted(0);
    setGlobalPartners(0);
    setOnTimeDelivery(0);

    const steps = duration / intervalTime;
    const increments = {
      monthlyServices: targets.monthlyServices / steps,
      deliveriesCompleted: targets.deliveriesCompleted / steps,
      globalPartners: targets.globalPartners / steps,
      onTimeDelivery: targets.onTimeDelivery / steps,
    };

    intervalRef.current = setInterval(() => {
      setMonthlyServices((prev) =>
        prev + increments.monthlyServices >= targets.monthlyServices
          ? targets.monthlyServices
          : prev + increments.monthlyServices
      );
      setDeliveriesCompleted((prev) =>
        prev + increments.deliveriesCompleted >= targets.deliveriesCompleted
          ? targets.deliveriesCompleted
          : prev + increments.deliveriesCompleted
      );
      setGlobalPartners((prev) =>
        prev + increments.globalPartners >= targets.globalPartners
          ? targets.globalPartners
          : prev + increments.globalPartners
      );
      setOnTimeDelivery((prev) =>
        prev + increments.onTimeDelivery >= targets.onTimeDelivery
          ? targets.onTimeDelivery
          : prev + increments.onTimeDelivery
      );
    }, intervalTime);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startCounterAnimation();
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatNumber = (value, suffix) => {
    const roundedValue = Math.round(value);
    if (suffix === "K") {
      return `${roundedValue.toLocaleString()}+`; 
    } else if (suffix === "+") {
      return `${roundedValue.toLocaleString()}+`;
    } else if (suffix === "%") {
      return `${roundedValue}%`;
    }
    return roundedValue.toLocaleString();
  };

  return (
    <div
      ref={sectionRef}
      className="mx-auto w-full flex justify-center items-center"
    >
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-stretch">
          <div className="flex-1 flex flex-col gap-10">
            <div>
              <TitleDescription
                title="About us"
                titleClass="text-3xl text-black"
              />
              <br />
              <div className="space-y-6">
                <p className="text-md text-gray-700">
                  Since 2011, Almas Movers International, based in Doha, Qatar, has been providing ISO-certified, stress-free international moving and relocation services. With a commitment to excellence, we are proud members of renowned industry organizations such as IAM, BAR, and FIATA. As a certified "Trusted Moving Company" by IAM, we are dedicated to offering expert advice and seamless relocation experiences both locally and internationally.
                </p>
                <p className="text-md text-gray-700">
                  Our team ensures every move, whether within Qatar or abroad, is handled with precision, care, and professionalism, making us the trusted choice for all your moving needs.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-10 -mt-2 sm:-mt-2 lg:-mt-0">
              <Button
                label="Explore More"
                onClick={() => navigate("/about-us")}
                icon="ArrowUpRight"
                className="w-fit bg-secondary text-black rounded-2xl px-4 py-3 text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300"
              />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-4 lg:flex lg:justify-between lg:items-center lg:gap-4 bg-gray-100 p-4 rounded-2xl sm:bg-transparent sm:p-0">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#121211] mb-2 sm:mb-4">
                    {formatNumber(monthlyServices, "K")}
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                    Years of <br /> Experience
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl lg:text-4xl text-[#121211] font-semibold mb-2 sm:mb-4">
                    {formatNumber(deliveriesCompleted, "K")}
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                    Successful <br /> Moves
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl lg:text-4xl text-[#121211] font-semibold mb-2 sm:mb-4">
                    {formatNumber(globalPartners, "+")}
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                    Countries <br /> Covered
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl lg:text-4xl text-[#121211] font-semibold mb-2 sm:mb-4">
                    {formatNumber(onTimeDelivery, "%")}
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                    Customer <br />Satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-stretch overflow-hidden">
            <img
              src={rightImage}
              alt="Logistics and Moving"
              className="w-full h-[300px] sm:h-[450px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;