import FeaturedRoom from "@/components/Home/FeaturedRoom";
import { Hero } from "../components/Hero/Hero";
import ServiceAdds from "../components/Home/ServiceAds";
import Testimonials from "@/components/Home/Testimonial";
import HowItWorks from "@/components/Home/HowItWorks";
import ChooseUs from "@/components/Home/ChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <ServiceAdds />
      <FeaturedRoom />
      <ChooseUs />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;
