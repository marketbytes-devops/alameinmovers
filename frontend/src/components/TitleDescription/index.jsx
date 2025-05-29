import React from 'react';
 
const TitleDescription = ({
  title = '',
  description = '',
  titleClass = 'text-3xl font-semibold text-black py-2 mt-8',
  descriptionClass = 'text-lg text-black',
}) => {
  return (
    <div className="text-center sm:text-center lg:text-left">
      {title && (
        <h2 className={titleClass}>
          {title}
        </h2>
      )}
      {description && (
        <p className={descriptionClass}>
          {description}
        </p>
      )}
    </div>
  );
};
 
export default TitleDescription;
 