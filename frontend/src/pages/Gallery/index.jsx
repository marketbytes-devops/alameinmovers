import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import image1 from '../../assets/gallery/img1.webp';
import image2 from '../../assets/gallery/img2.webp';
import image3 from '../../assets/gallery/img3.webp';
import image4 from '../../assets/gallery/img4.webp';
import image5 from '../../assets/gallery/img5.webp';
import image6 from '../../assets/gallery/img6.webp';
import image7 from '../../assets/gallery/img7.webp';
import image8 from '../../assets/gallery/pic2.webp';
import image9 from '../../assets/gallery/pic3.webp';
import image10 from '../../assets/gallery/pic4.webp';
import image11 from '../../assets/gallery/pic5.webp';
import image13 from '../../assets/gallery/blogArticle.webp';
import bannerImage from '../../assets/international_relocation.webp';
import Banner from '../../components/Banner';
import TitleDescription from '../../components/TitleDescription';

const Gallery = () => {
  const tabs = [
    {
      name: 'Movers',
      images: [image1, image2, image3, image4],
    },
    {
      name: 'Logistics',
      images: [image5, image6, image7],
    },
    {
      name: 'Warehousing',
      images: [image6, image8, image9],
    },
    {
      name: 'Team',
      images: [image7, image10, image11, image13],
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [selectedImage, setSelectedImage] = useState(null);

  const activeImages = tabs.find((tab) => tab.name === activeTab).images;

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>Project Gallery | Almas Movers International – Our Work in Action</title>
        <meta
          name="description"
          content="View our gallery showcasing successful moves, logistics operations, and client relocations. See why Almas Movers is trusted across Qatar and internationally."
        />
        <meta
          name="keywords"
          content="Almas Movers gallery, Qatar moving services, international relocation, logistics gallery, warehousing services"
        />
        <link rel="canonical" href="https://www.almasmovers.com/gallery" />
      </Helmet>
      <Banner
        title="Gallery"
        bannerImage={bannerImage}
        titleFirst="Gallery"
        mainRoute="Home"
        subRoute="Gallery"
        subRoutePath="/gallery"
      />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mb-12 sm:-mb-8 md:-mb-8 lg:-mb-8 xl:-mb-8">
        <div className="py-8 sm:py-12 lg:py-16 text-center">
          <TitleDescription title="Gallery" titleClass="flex items-center justify-center" />
          <div className="flex justify-center items-center my-6 sm:my-8">
            <div className="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-lg max-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === tab.name
                      ? 'bg-primary text-white'
                      : 'bg-transparent text-primary hover:bg-gray-200'
                  }`}
                  aria-label={`View ${tab.name} gallery`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {activeImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:shadow-lg"
                onClick={() => handleImageClick(image)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleImageClick(image)}
                aria-label={`View ${activeTab} image ${index + 1} in full size`}
              >
                <img
                  src={image}
                  alt={`${activeTab} image ${index + 1}`}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleCloseModal}
          role="dialog"
          aria-label="Image preview modal"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-4xl mx-4 sm:mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 sm:p-3 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={handleCloseModal}
              aria-label="Close image preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
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
            <img
              src={selectedImage}
              alt="Full-size gallery image"
              className="w-full h-auto max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;