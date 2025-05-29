import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Helmet } from "react-helmet";
import Banner from "../../components/Banner";
import serviceData from "../../assets/data/serviceData";
import OurServices from "../Home/UiComponents/OurServices";
import TickIcon from "../../assets/moving/yellowtick.svg";

const Services = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = serviceData.find(
    (item) => item.slug === `/services/${slug}`
  );

  useEffect(() => {
    if (!service) {
      navigate("/not-found", { replace: true });
    }
  }, [service, navigate]);

  if (!service) {
    return null;
  }

  return (
    <div className="w-full -mb-8 sm:-mb-8 md:-mb-0 lg:-mb-0 xl:-mb-0">
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <meta name="keywords" content={service.keywords} />
        <link rel="canonical" href={`https://www.almasmovers.com${service.slug}`} />
      </Helmet>
      <Banner
        bannerImage={service.bannerImage}
        titleFirst={service.title}
        mainRoute="Home"
        smallText={service.bannerDescription}
        subRoute={service.title}
        subRoutePath={`/services/${slug}`}
        onError={() => console.log(`Failed to load banner image: ${service.title}`)}
      />

      <div className="container-secondary pl-4 sm:pl-8 md:pl-16 lg:pl-40 mt-8 lg:mt-16">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
            <div className="w-full">
              <img
                src={service.featureImage}
                alt={service.title}
                className="w-full h-auto rounded-lg object-cover max-h-[500px]"
                onError={() => console.log(`Failed to load feature image: ${service.title}`)}
              />
            </div>
            <div className="w-full self-start">
              <h2 className="text-3xl pt-0 md:pt-6 pb-0 sm:pb-0 md:pb-3 lg:pb-3 mb-4 sm:mb-4 lg:mb-2">
                {service.featureTitle}
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 pr-0 md:pr-20">
                {service.featureDescription}
              </p>
              <ul className="space-y-3 text-lg text-gray-800">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <img 
                      src={TickIcon} 
                      alt="Check mark" 
                      className="mr-3 mt-1 w-5 h-5 flex-shrink-0" 
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="container-secondary -mt-2 sm:-mt-2 lg:-mt-0 md:-mt-0 xl:-mt-0 mb-16 sm:mb-16 lg:-mb-0 overflow-hidden">
        <OurServices currentSlug={slug} />
      </section>
    </div>
  );
};

export default Services;