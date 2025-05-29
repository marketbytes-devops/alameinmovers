import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from '../../../../assets/data/blogData';
import TitleDescription from '../../../../components/TitleDescription';

const truncateDescription = (text, wordLimit = 40) => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const LatestUpdates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2; 
  const latestPostsCount = 3; 
  const totalPages = Math.ceil((data.blogLists.length - latestPostsCount) / postsPerPage);

  const latestUpdates = data.blogLists.slice(0, latestPostsCount);
  const otherUpdates = data.blogLists.slice(latestPostsCount);
  const currentOtherUpdates = otherUpdates.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mx-auto">
      {currentPage === 1 && (
        <section className="mb-8 sm:mb-12">
          <div className='pb-8 sm:pb-8 lg:pb-14 -mt-8 sm:-mt-8 lg:-mt-0'>
            <TitleDescription title='Latest Updates' titleClass='text-3xl'/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
            {latestUpdates.map((update) => (
              <Card
                key={update.id}
                {...update}
                isLatest={true}
                description={truncateDescription(update.detail.content[0].description)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="">
        <div className='pb-8 sm:pb-8 lg:pb-14'>
          <TitleDescription title='Other Updates' titleClass='text-3xl'/>
        </div>
        <div className="space-y-4 sm:space-y-6">
          {currentOtherUpdates.map((update, index) => (
            <div key={update.id}>
              <OtherCard
                {...update}
                description={truncateDescription(update.detail.content[0].description)}
              />
              {index < currentOtherUpdates.length - 1 && (
                <hr className="my-4 sm:my-6 border-t border-gray-600" />
              )}
            </div>
          ))}
        </div>
        <hr className="pt-8 my-4 sm:my-6 border-t border-gray-600" />
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevPage}
            className={`text-gray-600 hover:text-gray-900 text-sm sm:text-base ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <div className="flex space-x-1 sm:space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
                  currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className={`text-gray-600 hover:text-gray-900 text-sm sm:text-base ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

const Card = ({ id, image, title, date, description, isLatest }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/blog/${id}`}
      className="w-full bg-gray-100 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt="update"
        className="w-full h-36 sm:h-36 object-cover"
      />
      <div className="p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-700 mb-3">{date}</p>
        <p className="text-xs sm:text-sm mb-4 line-clamp-3">{description}</p>
        <div
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black transition-colors duration-300 ${
            isHovered ? 'bg-black border-black' : 'bg-transparent'
          }`}
        >
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300"
          >
            <path
              d="M15.452 13.5802L16.513 12.5202L22.292 18.2972C22.3851 18.3898 22.4591 18.4999 22.5095 18.6211C22.56 18.7424 22.5859 18.8724 22.5859 19.0037C22.5859 19.1351 22.56 19.2651 22.5095 19.3863C22.4591 19.5076 22.3851 19.6177 22.292 19.7102L16.513 25.4902L15.453 24.4302L20.877 19.0052L15.452 13.5802Z"
              fill={isHovered ? 'white' : 'black'}
              transform="scale(1.3) translate(-3.5, -3.5)"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

const OtherCard = ({ id, image, title, date, author, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/blog/${id}`}
      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row items-start">
        <img
          src={image}
          alt="update"
          className="w-full sm:w-1/3 h-48 sm:h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-t-none"
        />
        <div className="p-4 flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <h3 className="text-lg sm:text-xl text-black font-semibold group-hover:text-primary transition-colors duration-300 line-clamp-2">{title}</h3>
            <div
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black transition-all duration-300 transform group-hover:-translate-y-1 ${
                isHovered ? 'bg-yellow-500 border-yellow-500' : 'bg-transparent'
              } mt-2 sm:mt-0`}
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300"
              >
                <path
                  d="M15.452 13.5802L16.513 12.5202L22.292 18.2972C22.3851 18.3898 22.4591 18.4999 22.5095 18.6211C22.56 18.7424 22.5859 18.8724 22.5859 19.0037C22.5859 19.1351 22.56 19.2651 22.5095 19.3863C22.4591 19.5076 22.3851 19.6177 22.292 19.7102L16.513 25.4902L15.453 24.4302L20.877 19.0052L15.452 13.5802Z"
                  fill={isHovered ? 'white' : 'black'}
                  transform="scale(1.3) translate(-3.5, -3.5)"
                />
              </svg>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 mb-4 line-clamp-3">{description}</p>
          <p className="text-xs sm:text-sm font-semibold text-gray-900">{author}</p>
          <p className="text-xs sm:text-sm text-gray-500">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default LatestUpdates;