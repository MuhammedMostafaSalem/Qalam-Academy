import FeaturedCourses from "@/components/home/courses/FeaturedCourses";
import Hero from "@/components/home/hero/Hero";
import PortfolioSection from "@/components/home/portfolio/PortfolioSection";
import Services from "@/components/home/services/Services";
import WhyChooseSection from "@/components/home/whyChoose/WhyChooseSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedCourses />
      <PortfolioSection />
      <WhyChooseSection />
    </>
  );
}
