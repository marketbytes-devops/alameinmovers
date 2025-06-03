import { useNavigate, Link } from 'react-router-dom';
import houseMovingImage from '../../../assets/moving/housemoving.webp';
import officeRelocationImage from '../../../assets/moving/officerelocation.webp';
import internationalRelocationImage from '../../../assets/moving/internationalreloc.webp';
import insuranceImage from '../../../assets/moving/insurance.webp';
import storageServicesImage from '../../../assets/logistics/storage.webp';
import vehicleImportExportImage from '../../../assets/logistics/carshipping.webp';
import airFreightImage from '../../../assets/logistics/Airfreight.webp';
import seaFreightImage from '../../../assets/logistics/seafreight.webp';
import furnitureInstallationImage from '../../../assets/services/furniture-card.webp';
import petRelocationImage from '../../../assets/services/pet-card.webp';
import eventExhibitionImage from '../../../assets/services/event-exhibition.webp';
import storageSolutionsHouseholdImage from '../../../assets/services/storage-solutions-household.webp';
import landFreightImage from '../../../assets/services/land-freight-card.webp';
import Button from '../../../components/Button';

const servicesData = {
  Movers: [
    {
      image: houseMovingImage,
      title: 'House Moving',
      description: 'Our house moving service guarantees the safe and timely relocation of your belongings across Qatar. We take care of every step, ensuring a smooth and efficient move into your new home.',
      link: '/services/house-moving',
    },
    {
      image: officeRelocationImage,
      title: 'Office Relocation',
      description: 'Efficient office and commercial moving solutions with minimal disruption to your business. We handle furniture, equipment, and all logistics, ensuring a smooth transition to your new office space.',
      link: '/services/office-relocation',
    },
    {
      image: vehicleImportExportImage,
      title: 'Vehicle Import and Export',
      description: 'Need to ship your car overseas? Our reliable Vehicle Import and Export services offer pre-inspection, safe transport, and insurance to ensure your vehicle reaches its destination in perfect condition.',
      link: '/services/vehicle-import-and-export',
    },
    {
      image: internationalRelocationImage,
      title: 'International Relocation',
      description: 'We offer seamless international relocation services, managing everything from packing to delivery, ensuring a stress-free transition to your new home or office, no matter the destination',
      link: '/services/international-relocation',
    },
    {
      image: insuranceImage,
      title: 'Insurance Coverage',
      description: 'Comprehensive insurance coverage for all your moving needs, ensuring the protection of your belongings during transit. Enjoy peace of mind knowing your items are safeguarded throughout the journey.',
      link: '/services/insurance-coverage',
    },
    {
      image: furnitureInstallationImage,
      title: 'Furniture Installation on Contract',
      description: 'Professional furniture installation on contract, providing efficient assembly and seamless setup tailored to your space, ensuring a hassle-free experience and high-quality results.',
      link: '/services/furniture-installation-on-contract',
    },
    {
      image: petRelocationImage,
      title: 'Pet Relocations',
      description: 'Safe and reliable pet relocation services, ensuring a smooth and stress-free journey for your pets, with careful handling and timely transport to their new home.',
      link: '/services/pet-relocations',
    },
    {
      image: eventExhibitionImage,
      title: 'Event and Exhibition Relocation',
      description: 'Efficient event and exhibition relocation services, ensuring the secure transport, timely delivery, and professional setup of your displays and equipment for a seamless event experience.',
      link: '/services/event-and-exhibition-relocation',
    },
    {
      image: storageSolutionsHouseholdImage,
      title: 'Storage Solutions for Household Goods',
      description: 'Secure and flexible storage solutions for household goods, offering safe, accessible, and affordable spaces for short or long-term storage needs, ensuring your items are well-protected.',
      link: '/services/storage-solutions-for-household-goods',
    },
  ],
  Logistics: [
    {
      image: storageServicesImage,
      title: 'Commercial Storage Solutions',
      description: 'Secure, clean, and spacious storage facilities for your personal or commercial needs. Our well-equipped storage units ensure your items are safely stored and easily accessible when needed.',
      link: '/services/commercial-storage-solutions',
    },
    {
      image: airFreightImage,
      title: 'Air Freight',
      description: 'Our air freight service ensures your goods are delivered swiftly to international destinations. We handle everything from booking to customs clearance, ensuring timely arrivals.',
      link: '/services/air-freight-services',
    },
    {
      image: seaFreightImage,
      title: 'Sea Freight',
      description: 'We offer comprehensive sea freight solutions for both large and small shipments. Our team manages everything from loading to customs clearance, ensuring smooth transit.',
      link: '/services/sea-freight-services',
    },
    {
      image: landFreightImage,
      title: 'Land Freight',
      description: 'Reliable land freight services, providing safe and timely transport of your goods, whether locally or internationally, with efficient and cost-effective logistics solutions.',
      link: '/services/land-freight-services',
    }
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
          className={`px-16 py-2 mb-6 rounded-full text-xl ${serviceType === 'Movers'
            ? 'bg-secondary text-black'
            : 'border-2 border-primary text-black'
            }`}
        />
        <Button
          label="Logistics"
          onClick={() => handleTabClick('Logistics')}
          className={`px-16 py-2 mb-6 rounded-full text-xl ${serviceType === 'Logistics'
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