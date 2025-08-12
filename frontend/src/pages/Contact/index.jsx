import React from "react";
import { Helmet } from "react-helmet";
import bannerImage from "../../assets/contact/banner.webp";
import Banner from "../../components/Banner";
import GetInTouchSection from "../Home/UiComponents/GetinTouch";
import Connectwithus from "./UiComponents/ConnectWithUs";

const Contact = () => {
  const connectRef = useRef(null);

  useEffect(() => {
    if (window.location.href === "https://www.almasintl.com/contact-us" && connectRef.current) {
      connectRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Contact Almas Movers in Doha | Get a Free Moving Quote Today</title>
        <meta
          name="description"
          content="Need help with moving or logistics in Qatar or abroad? Contact Almas Movers International today for expert support and a free moving quote."
        />
        <meta
          name="keywords"
          content="contact Almas Movers, moving quote Doha, international movers Qatar, logistics support Qatar, Almas Movers International, free moving quote, relocation services Doha"
        />
        <link rel="canonical" href="https://www.almasmovers.com/contact-us" />
      </Helmet>
      <Banner
        bannerImage={bannerImage}
        titleFirst="Contact Us"
        mainRoute="HOME"
        subRoute="CONTACT US"
        subRoutePath="/contact-us"
        smallText="Plan a stress-free international move with Almas Movers International. Our expert relocation services ensure a smooth transition, offering international moving tips, professional packing for international moves, and support for moving abroad."
      />
      <section>
        <div className="mx-auto w-full mt-12 sm:mt-12 lg:mt-16">
          <Connectwithus />
        </div>
      </section>
      <section className="w-full bg-primary/10 mt-12 sm:mt-12 lg:mt-16" ref={connectRef}>
        <div className="mx-auto w-full py-8 sm:py-12 md:py-16">
          <GetInTouchSection />
        </div>
      </section>
    </>
  );
};

export default Contact;
