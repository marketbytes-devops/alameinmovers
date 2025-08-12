import React from "react";
import { Helmet } from "react-helmet";
import WhoweAre from "../../pages/AboutUs/UiComponents/WhoweAre";
import Banner from "../../components/Banner";
import bannerImage from "../../assets/about/banner.webp";
import WhychooseUs from "./UiComponents/WhychooseUs";
import Certifications from "./UiComponents/Certifications";
import Relocate from "./UiComponents/Relocating";
import GetInTouchSection from "../Home/UiComponents/GetinTouch";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Almas Movers | Leading Relocation & Logistics Company in Qatar</title>
        <meta
          name="description"
          content="Learn more about Almas Movers International – Qatar’s trusted name in international relocation, logistics, and moving services with years of proven expertise."
        />
        <meta
          name="keywords"
          content="About Almas Movers, international relocation Qatar, logistics company Qatar, moving services Doha, Almas Movers International, trusted movers Qatar, relocation expertise"
        />
        <link rel="canonical" href="https://www.almasmovers.com/about-us" />
      </Helmet>

      <Banner
        bannerImage={bannerImage}
        titleFirst="ISO Certified"
        titleSecond="Moving Company in Qatar"
        mainRoute="Home"
        subRoute="About Us"
        subRoutePath="/about-us"
        smallText="Almas Movers International is a trusted Qatar-based logistics company offering professional moving, packing, and freight solutions with a commitment to reliability, safety, and customer satisfaction."
        enquireButton={true}
      />

      <section className="w-full mt-10 sm:mt-10 lg:mt-16">
        <div className="w-full container-secondary">
          <p className="text-gray-700 text-center">
            With over a decade of trusted service, Almas Movers International, based in Doha, Qatar, specializes in making international moves stress-free. Our expertise in relocation ensures a seamless experience, combining global reach with local knowledge. As proud members of the International Association of Movers (IAM), the British Association of Movers (BAR), and the International Federation of Freight Forwarders Associations (FIATA), and certified as a Trusted Moving Company by IAM, we uphold the highest standards of professionalism and excellence in both local and international moving services."
          </p>
        </div>
      </section>

      <section className="w-full bg-primary mt-10 sm:mt-10 lg:mt-16 overflow-hidden">
        <div className="container-secondary our-services">
          <WhoweAre />
        </div>
      </section>

      <section className="w-full overflow-hidden">
        <div className="container-secondary our-services mt-10 sm:mt-10 lg:mt-16 mb-4 sm:mb-4 md:mb-0 lg:mb-0 xl:mb-0">
          <WhychooseUs />
        </div>
      </section>

      <section className="w-full mt-10 sm:mt-10 lg:mt-16 overflow-hidden">
        <div className="container-secondary">
          <Certifications />
        </div>
      </section>

      <section className="w-full mt-10 sm:mt-10 lg:mt-16">
        <div className="w-full">
          <Relocate />
        </div>
      </section>

      <section className="w-full bg-primary/10 mt-12 sm:mt-12 lg:mt-16">
        <div className="mx-auto w-full py-8 sm:py-12 md:py-16">
          <GetInTouchSection />
        </div>
      </section>
    </>
  );
};

export default AboutUs;

