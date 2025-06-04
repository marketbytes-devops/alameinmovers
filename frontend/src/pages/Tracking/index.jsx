import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../../components/Banner";
import bannerImage from "../../assets/tracking/Banner.webp";
import Shipment from "./UiComponents/Shipment";
import GetInTouchSection from "../Home/UiComponents/GetinTouch";
import ContactUs from "../../pages/Home/UiComponents/ContactUs";
 
const Tracking = () => {
  return (
    <>
    <Helmet>
      <title>Track Your Shipment | Almas Movers International Doha</title>
      <meta
        name="description"
        content="Track your shipment easily with Almas Movers International. Get real-time updates on your relocation or logistics delivery from Doha to anywhere in the world."
      />
      <meta
        name="keywords"
        content="track shipment, Almas Movers tracking, international relocation tracking, logistics tracking Doha, real-time shipment updates, moving services Qatar"
      />
      <link rel="canonical" href="https://www.almasmovers.com/track-your-cargo" />
    </Helmet>
 
      <Banner
        bannerImage={bannerImage}
        titleFirst="Track Your Cargo"
        smallText="Never lose sight of your cargo. Track it instantly with just a tracking number and stay updated every step of the way."
        mainRoute="HOME"
        subRoute="TRACK"
        subRoutePath="/track-your-cargo"
      />
 
      <section className="w-full mt-8 sm:mt-8 lg:mt-16">
        <div className="container-secondary">
          <p className="text-gray-700 text-center">
            At Almas Movers International, we ensure a stress-free international
            move by offering reliable tracking and comprehensive relocation
            services. Based in Doha, Qatar, our expertise in international
            relocation and moving abroad, combined with international moving
            tips, helps you stay informed and confident throughout your journey.
            From packing for an international move to real-time shipment
            tracking, we make your move seamless and worry-free.
          </p>
        </div>
      </section>
 
      <section className="container-secondary mt-8 sm:mt-8 lg:mt-16">
        <Shipment />
      </section>
 
      <section className="container-secondary our-services mt-8 sm:mt-10 lg:mt-16">
        <ContactUs />
      </section>
 
      {/* <section className="w-full container-secondary mt-10 sm:mt-10 lg:mt-16">
        <MakeanEnquiry />
      </section> */}
 
      <section className="w-full bg-primary/10 mt-8 sm:mt-8 lg:mt-16">
        <div className="mx-auto w-full py-6 sm:py-12 md:py-16">
          <GetInTouchSection />
        </div>
      </section>
    </>
  );
};
 
export default Tracking;
 