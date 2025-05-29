import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import pic1 from '../../../assets/moving/housemoving.webp';
import pic2 from '../../../assets/moving/officerelocation.webp';
import pic3 from '../../../assets/moving/internationalreloc.webp';
import pic4 from '../../../assets/moving/insurance.webp';
import pic5 from '../../../assets/logistics/storage.webp';
import pic6 from '../../../assets/logistics/carshipping.webp';
import pic7 from '../../../assets/logistics/Airfreight.webp';
import pic8 from '../../../assets/logistics/seafreight.webp';
import Button from '../../../components/Button';

const servicesData = {
  Movers: [
    {
      image: pic1,
      title: 'House Moving',
      description: 'Our house moving service guarantees the safe and timely relocation of your belongings across Qatar. We take care of every step, ensuring a smooth and efficient move into your new home.',
      link: '/services/house-moving',
    },
    {
      image: pic2,
      title: 'Office Relocation',
      description: 'Efficient office and commercial moving solutions with minimal disruption to your business. We handle furniture, equipment, and all logistics, ensuring a smooth transition to your new office space.',
      link: '/services/office-relocation', 
    },
    {
      image: pic3,
      title: 'International Relocation',
      description: 'We offer seamless international relocation services, managing everything from packing to delivery, ensuring a stress-free transition to your new home or office, no matter the destination',
      link: '/services/international-relocation', 
    },
    {
      image: pic4,
      title: 'Insurance',
      description: 'Comprehensive insurance coverage for all your belongings during a move, offering peace of mind. Whether moving locally or internationally, our tailored insurance plans protect your goods throughout the process.',
      link: '/services/insurance-coverage', 
    },
  ],
  Logistics: [
    {
      image: pic5,
      title: 'Storage Services',
      description: 'Secure, clean, and spacious storage facilities for your personal or commercial needs. Our well-equipped storage units ensure your items are safely stored and easily accessible when needed.',
      link: '/services/storage-solutions',
    },
    {
      image: pic6,
      title: 'Car Shipping Service',
      description: 'Need to ship your car overseas? Our reliable car shipping services offer pre-inspection, safe transport, and insurance to ensure your vehicle reaches its destination in perfect condition.',
      link: '/services/vehicle-relocation', 
    },
    {
      image: pic7,
      title: 'Air Freight',
      description: 'Our air freight service ensures your goods are delivered swiftly to international destinations. We handle everything from booking to customs clearance, ensuring timely arrivals.',
      link: '/services/air-freight', 
    },
    {
      image: pic8,
      title: 'Sea Freight',
      description: 'We offer comprehensive sea freight solutions for both large and small shipments. Our team manages everything from loading to customs clearance, ensuring smooth transit.',
      link: '/services/sea-freight',
    },
  ],
};

const OtherServices = ({ serviceType }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (tab === 'Movers') {
      navigate('/moving-services');
    } else if (tab === 'Logistics') {
      navigate('/logistics-services');
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-center space-x-4">
        <Button
          label="Movers"
          onClick={() => handleTabClick('Movers')}
          className={`px-16 py-2 mb-6 rounded-full text-xl ${
            serviceType === 'Movers'
              ? 'bg-secondary text-black'
              : 'border-2 border-primary text-black'
          }`}
        />
        <Button
          label="Logistics"
          onClick={() => handleTabClick('Logistics')}
          className={`px-16 py-2

 mb-6 rounded-full text-xl ${
            serviceType === 'Logistics'
              ? 'bg-secondary text-black'
              : 'border-2 border-primary text-black'
          }`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
        {servicesData[serviceType].map((service, index) => (
          <div key={index} className="flex flex-col items-left">
            <Link to={service.link}>
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-56 object-cover rounded-lg mb-4 hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link to={service.link}>
              <h3 className="text-left text-lg font-semibold text-gray-800 mb-2 hover:text-primary transition-colors">
                {service.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm">{service.description}</p>
            <Button
              label="Explore"
              onClick={() => navigate(service.link)}
              className="mt-4 w-fit px-6 py-2 rounded-full text-sm border-2 border-primary text-black hover:bg-primary hover:text-white transition-colors"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4"></div>
    </div>
  );
};

export default OtherServices;