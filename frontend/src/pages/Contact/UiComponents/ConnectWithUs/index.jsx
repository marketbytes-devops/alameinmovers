import React from "react";
import connectimage from "../../../../assets/contact/connectwithus.webp";
import TitleDescription from "../../../../components/TitleDescription";
import { Link } from "react-router-dom";

const Connectwithus = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-1/2 bg-gray-100 px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col justify-center mx-auto max-w-full ml-4 lg:ml-[130px] lg:m-14 lg:py-0">
          <div className="ml-0 lg:ml-0">
            <TitleDescription
              title="Connect With Us Anytime"
              titleClass="text-xl sm:text-2xl lg:text-3xl text-black py-3 sm:py-4"
              description="We are always here to assist you with your relocation needs. Headquartered in Qatar, we proudly serve clients globally. Reach out to us anytime for any queries or assistance."
              descriptionClass="text-xs sm:text-sm lg:text-sm text-black mb-4 sm:mb-6"
            />
          </div>

          <div className="w-full mb-4 sm:mb-6">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <svg
                width="20"
                height="20"
                className="sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.40048 4.76001C7.8908 3.2995 9.89728 2.48614 11.9839 2.49668C14.0705 2.50722 16.0687 3.34081 17.5442 4.8163C19.0197 6.29179 19.8533 8.28995 19.8638 10.3766C19.8744 12.4632 19.061 14.4697 17.6005 15.96L13.4145 20.146C13.0394 20.521 12.5308 20.7316 12.0005 20.7316C11.4702 20.7316 10.9615 20.521 10.5865 20.146L6.40048 15.96C4.91537 14.4747 4.08105 12.4604 4.08105 10.36C4.08105 8.25964 4.91537 6.24528 6.40048 4.76001Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13.36C13.6569 13.36 15 12.0168 15 10.36C15 8.70313 13.6569 7.35999 12 7.35999C10.3431 7.35999 9 8.70313 9 10.36C9 12.0168 10.3431 13.36 12 13.36Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-lg sm:text-xl lg:text-2xl  text-black">
                Location
              </h3>
            </div>
            <div className="w-full pl-8 sm:pl-10 lg:pl-10">
              <p className="text-sm sm:text-base md:text-lg">
                Office 01, Building 317,
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                Street 250, Zone 43,
              </p>
              <p className="text-sm sm:text-base md:text-lg">Fareej Al Ali,</p>
              <p className="text-sm sm:text-base md:text-lg">Doha- Qatar</p>
            </div>
          </div>

          <div className="w-full mb-4 sm:mb-6">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <svg
                width="20"
                height="20"
                className="sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                  fill="black"
                />
              </svg>
              <h3 className="text-lg sm:text-xl lg:text-2xl text-black">
                Email
              </h3>
            </div>

            <div className="w-full pl-8 sm:pl-10 lg:pl-10">
              <p className="text-sm sm:text-base lg:text-base">
                <a href="mailto:movers@almasintl.com">movers@almasintl.com</a>
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="w-full">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <svg
                width="20"
                height="20"
                className="sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                viewBox="0 0 16 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M2.80629 0.468103L3.97329 0.117103C4.61258 -0.075673 5.30017 -0.0292666 5.90776 0.247663C6.51535 0.524593 7.00142 1.01313 7.27529 1.6221L8.17729 3.6281C8.41275 4.1519 8.47832 4.73628 8.3648 5.29924C8.25127 5.8622 7.96435 6.37549 7.54429 6.7671L6.04929 8.1601C6.00561 8.2008 5.97795 8.25578 5.97129 8.3151C5.92729 8.7121 6.19629 9.4851 6.81729 10.5601C7.26729 11.3411 7.67629 11.8901 8.02329 12.1971C8.26629 12.4121 8.39929 12.4581 8.45629 12.4421L10.4663 11.8271C11.0152 11.6592 11.6029 11.6673 12.147 11.8502C12.6911 12.0331 13.1643 12.3817 13.5003 12.8471L14.7803 14.6231C15.17 15.1631 15.3505 15.8261 15.2883 16.4891C15.2261 17.1521 14.9255 17.77 14.4423 18.2281L13.5553 19.0681C13.0851 19.5134 12.5075 19.8293 11.8789 19.9851C11.2503 20.1409 10.5921 20.1313 9.96829 19.9571C7.21429 19.1881 4.74529 16.8641 2.53329 13.0331C0.319286 9.1971 -0.458714 5.8931 0.259286 3.1201C0.420462 2.49644 0.739572 1.92481 1.18586 1.4603C1.63215 0.995798 2.18956 0.654087 2.80629 0.468103ZM3.24029 1.9051C2.87017 2.01641 2.53497 2.22118 2.26699 2.49967C1.99901 2.77816 1.80728 3.12099 1.71029 3.4951C1.10829 5.8271 1.79729 8.7561 3.83329 12.2831C5.86729 15.8051 8.05629 17.8661 10.3733 18.5131C10.7476 18.6175 11.1425 18.6232 11.5196 18.5296C11.8968 18.436 12.2432 18.2464 12.5253 17.9791L13.4113 17.1391C13.6311 16.9309 13.7679 16.65 13.7962 16.3485C13.8245 16.0471 13.7425 15.7456 13.5653 15.5001L12.2853 13.7251C12.1325 13.5133 11.9173 13.3547 11.6698 13.2715C11.4223 13.1882 11.155 13.1846 10.9053 13.2611L8.89029 13.8781C7.72029 14.2261 6.65929 13.2851 5.51929 11.3101C4.74929 9.9801 4.39129 8.9501 4.48129 8.1491C4.52729 7.7331 4.72129 7.3491 5.02629 7.0631L6.52129 5.6701C6.71214 5.492 6.84245 5.25861 6.89392 5.00269C6.94539 4.74676 6.91545 4.48114 6.80829 4.2431L5.90729 2.2371C5.78279 1.96029 5.56182 1.73824 5.28562 1.61238C5.00943 1.48651 4.69687 1.46545 4.40629 1.5531L3.24029 1.9051Z"
                  fill="black"
                />
              </svg>
              <h3 className="text-lg sm:text-xl lg:text-2xl text-black">
                Phone Number
              </h3>
            </div>
            <div className="w-full pl-8 sm:pl-10 lg:pl-10 pb-4 sm:pb-4 md:pb-0 lg:pb-0 xl:pb-0">
              <p className="text-sm sm:text-base lg:text-base">
                <a href="tel:+97444355663">+974 4435 5663</a>
              </p>
              <p className="text-sm sm:text-base lg:text-base">
                <a href="tel:+97466404688">+974 6640 4688</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-white overflow-hidden">
        <img
          src={connectimage}
          alt="Connect with Us Banner"
          className="w-full max-w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Connectwithus;
