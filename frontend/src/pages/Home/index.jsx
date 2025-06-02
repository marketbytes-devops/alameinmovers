import { Helmet } from "react-helmet";
import AboutSection from "./UiComponents/AboutSection";
import OurServices from "./UiComponents/OurServices";
import ContactUs from "./UiComponents/ContactUs";
import Review from "./UiComponents/Review";
import BlogSection from "./UiComponents/Blogs";
import GetInTouchSection from "./UiComponents/GetinTouch";
import Hero from "./UiComponents/Hero";

const Home = () => {

  return (
    <>
      <Helmet>
        <title>International Movers in Doha, Qatar | Almas Movers International</title>
        <meta
          name="description"
          content="Trusted international movers in Doha, Qatar offering relocation, logistics, storage, and freight services. Get a stress-free moving experience with Almas Movers."
        />
        <meta
          name="keywords"
          content="international movers Doha, Qatar movers, Almas Movers, international relocation, logistics services, storage solutions, freight services, stress-free moving, moving company Qatar"
        />
        <link rel="canonical" href="https://www.almasmovers.com/" />
      </Helmet>
      <section className="">
        <Hero />
      </section>
      <section className="container-secondary about-us mt-8 sm:mt-10 lg:mt-16">
        <AboutSection />
      </section>
      <section className="overflow-hidden container-secondary our-services mt-6 sm:mt-6 lg:mt-16">
        <OurServices />
      </section>
      <section className="overflow-hidden container-secondary our-services mt-8 sm:mt-10 lg:mt-16">
        <ContactUs />
      </section>
      <section className="overflow-hidden container-secondary our-services mt-8 sm:mt-10 lg:mt-16 mb-16 sm:mb-16 md:mb-8 lg:mb-8 xl:mb-8">
        <Review />
      </section>
      <section className="container-secondary our-services -mt-20 sm:-mt-20 md:-mt-0 lg:-mt-0 xl:-mt-0">
        <BlogSection />
      </section>
      <section className="w-full bg-primary/10 mt-10 sm:mt-12 lg:mt-16">
        <div className="mx-auto w-full py-6 sm:py-12 md:py-16">
          <GetInTouchSection />
        </div>
      </section>
    </>
  );
};

export default Home;
