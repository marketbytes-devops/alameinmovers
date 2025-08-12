import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../../components/Banner";
import bannerImage from "../../assets/moving/move.webp";
import GetInTouchSection from "../Home/UiComponents/GetinTouch";
import OtherServices from "../UiComponents/OtherServices";

const Moving = () => {
  return (
    <>
      <Helmet>
        <title>Expert Moving Services in Doha | Home, Office & International Relocation</title>
        <meta
          name="description"
          content="Explore our professional moving services including house, office, and international relocations. Almas Movers ensures safe, reliable, and timely moves in Qatar & abroad."
        />
        <meta
          name="keywords"
          content="moving services Doha, international relocation, house moving Qatar, office relocation, Almas Movers, professional movers Qatar, safe moving services, international moving"
        />
        <link rel="canonical" href="https://www.almasmovers.com/moving-services" />
      </Helmet>

      <Banner
        bannerImage={bannerImage}
        titleFirst="Moving"
        mainRoute="HOME"
        subRoute="MOVING"
        subRoutePath="/moving-services"
        smallText="Almas Movers International provides expert residential and commercial moving services across Qatar, ensuring safe packing, careful handling, timely transport, and stress-free relocation every time."
        enquireButton={true}
      />

      <section className="w-full mt-10 sm:mt-10 lg:mt-16">
        <div className="w-full container-secondary">
          <p className="text-gray-700 text-center">
            At Almas Movers International, we specialize in delivering a
            stress-free international move for our clients. Based in Doha,
            Qatar, our expertise in international relocation and moving abroad
            ensures a seamless experience. From providing international moving
            tips to offering comprehensive relocation services, we guide you
            through every step, including packing for an international move, to
            make your transition smooth and hassle-free.
          </p>
        </div>
      </section>

      <section className="container-secondary mt-10">
        <OtherServices serviceType="Movers" />
      </section>

      <section className="w-full bg-primary/10 mt-6 sm:mt-6 lg:mt-16">
        <div className="mx-auto w-full py-8 sm:py-12 md:py-16">
          <GetInTouchSection />
        </div>
      </section>
    </>
  );
};

export default Moving;