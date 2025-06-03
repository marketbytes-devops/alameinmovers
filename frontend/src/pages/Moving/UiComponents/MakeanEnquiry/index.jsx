import React, { useState } from 'react';
import AlmasLogo from '../../../../assets/Almas_logo.webp';
import Button from '../../../../components/Button';
import FormField from '../../../../components/FormField';

const MakeanEnquiry = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    serviceType: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry Form submitted:", formData);
    setIsModalOpen(false);
  };

  const serviceOptions = [
    { value: "localMove", label: "Local Move" },
    { value: "internationalMove", label: "International Move" },
    { value: "carExport", label: "Car Import and Export" },
    { value: "storageServices", label: "Storage Services" },
    { value: "logistics", label: "Logistics" },
  ];

  return (
    <div className="mx-auto w-full flex justify-center items-center">
      <div className="relative bg-gradient-to-b from-gray-500 to-primary text-white rounded-3xl p-8 shadow-lg w-full overflow-hidden flex flex-col items-center">

        <img
          src={AlmasLogo}
          alt="Almas Logo"
          className="absolute bottom-2/4 left-1/2 transform -translate-x-1/2 w-48 h-48"
        />
        <img
          src={AlmasLogo}
          alt="Almas Logo"
          className="absolute bottom-[-2rem] left-4 w-32 h-32 opacity-50"
        />
        <img
          src={AlmasLogo}
          alt="Almas Logo"
          className="absolute bottom-[-2rem] right-4 w-32 h-32 opacity-50"
        />

        <h1 className="text-3xl text-center mb-6"></h1>
        <p className="text-center text-2xl mb-6 max-w-2xl text-secondary">
          Planning a long distance move?
          <p><span>Almas is here to guide you every step of the way.</span></p>
        </p>
        <Button
          label="Make an enquiry"
          icon="ArrowUpRight"
          className="w-fit px-6 bg-secondary text-black text-xl text-left rounded-3xl py-3 hover:bg-white hover:text-black transition-colors"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

          <div
            className="absolute bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>


          <div className="relative bg-gradient-to-b from-gray-500 to-primary text-white rounded-3xl p-8 shadow-lg w-full max-w-lg mx-4">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl text-center mb-6">Make an Enquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <FormField
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone number"
                required
              />
              <FormField
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <FormField
                type="select"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                options={serviceOptions}
                placeholder="Service type"
                required
              />
              <FormField
                type="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
              />
              <div className="flex justify-center">
                <Button
                  label="Submit"
                  icon="ArrowUpRight"
                  className="w-fit px-6 bg-secondary text-black text-xl rounded-3xl py-3 hover:bg-white hover:text-black transition-colors"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeanEnquiry;
