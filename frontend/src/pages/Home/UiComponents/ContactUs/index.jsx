import React, { useState } from 'react';
import AlmasLogo from '../../../../assets/Almas_logo.webp'; 
import Button from '../../../../components/Button';
import ModalForm from '../../../../components/ModalForm';

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full flex justify-center items-center">
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

        <h1 className="text-3xl text-center mb-6">Reach Out Today</h1>
        <p className="text-center text-xl mb-6 max-w-2xl">
          Need trusted local movers in Qatar or expert freight forwarding solutions? We make moving seamless, secure, and stress-free.
        </p>
        <Button
          label="Plan Your Move"
          icon="ArrowUpRight"
          className="w-fit bg-secondary text-black rounded-2xl px-4 py-3 text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ContactUs;