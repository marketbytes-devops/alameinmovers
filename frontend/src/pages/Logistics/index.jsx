import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from '../../components/Banner';
import bannerImage from '../../assets/logistics/logisticsbanner.webp';
import GetInTouchSection from '../Home/UiComponents/GetinTouch';
import OtherServices from '../UiComponents/OtherServices';

const Logistics = () => {
  return (
    <>
      <Helmet>
        <title>Logistics Services in Qatar | Air & Sea Freight, Storage & More</title>
        <meta
          name="description"
          content="Reliable logistics solutions in Doha, Qatar. Almas Movers offers air freight, sea freight, storage, and supply chain logistics tailored to your needs."
        />
        <meta
          name="keywords"
          content="logistics services Qatar, air freight Doha, sea freight Qatar, storage solutions, supply chain logistics, Almas Movers, reliable logistics Qatar, logistics company Doha"
        />
        <link rel="canonical" href="https://www.almasmovers.com/logistics-services" />
      </Helmet>
      <Banner
        bannerImage={bannerImage}
        titleFirst="Logistics"

        bannerDescription="Dubai, London, Tokyo, wherever life takes you next, we ensure a stress-free international move for you and your loved ones, helping you arrive with ease and feel at home from the very start."
        description="Almas Movers International is your trusted partner for international relocation. Based in Qatar, we are globally recognized for our exceptional relocation services. Unlike other international moving companies, we prioritize distinction, customer satisfaction, and customized solutions for a seamless moving abroad experience. Discover our expert international moving tips and tailored packing for international move services."
        mainRoute="Home"
        subRoute="Logistics"
        subRoutePath="/logistics-services"
        smallText="Almas Movers International delivers end-to-end logistics solutions in Qatar, including freight forwarding, warehousing, and supply chain coordination, ensuring efficiency, reliability, and seamless cargo movement."
        enquireButton={true}
      />
      <section className="container-secondary mt-10">
        <OtherServices serviceType="Logistics" />
      </section>
      <section className="w-full bg-primary/10 mt-6 sm:mt-6 lg:mt-16">
        <div className="mx-auto w-full py-8 sm:py-12 md:py-16">
          <GetInTouchSection />
        </div>
      </section>
    </>
  );
};

export default Logistics;