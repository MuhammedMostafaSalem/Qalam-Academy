import FeaturedCourses from "@/components/home/courses/FeaturedCourses";
import CTASection from "@/components/home/cta/CTASection";
import Hero from "@/components/home/hero/Hero";
import PortfolioSection from "@/components/home/portfolio/PortfolioSection";
import Services from "@/components/home/services/Services";
import TestimonialsSection from "@/components/home/testimonials/TestimonialsSection";
import WhyChooseSection from "@/components/home/whyChoose/WhyChooseSection";
import ContinueWatching from "@/components/home/continueWatching/ContinueWatching";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
  return generateSEOMetadata({
    path: "/",
    title: {
      ar: "الرئيسية | منصة تعليمية رائدة لتطوير المهارات",
      en: "Home | Leading Educational Platform",
    },
  });
}

export default function Home() {
  return (
    <>
      <Hero />
      <ContinueWatching />
      <Services />
      <FeaturedCourses />
      <PortfolioSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
