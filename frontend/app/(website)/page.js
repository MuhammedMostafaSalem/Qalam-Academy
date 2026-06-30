import FeaturedCourses from "@/components/home/courses/FeaturedCourses";
import Hero from "@/components/home/hero/Hero";
import Services from "@/components/home/services/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedCourses />
    </>
  );
}
