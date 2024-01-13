import Gradient from "@/components/GradientBG/Gradient";
import CategoriesSection from "@/components/HomePage/Categories/CategoriesSection";
import HeroSection from "@/components/HomePage/HeroSection/HeroSection";
import JobsSection from "@/components/HomePage/Jobs/JobsSection";
import Layout from "@/components/Layout/Layout";
import Newsletter from "@/components/HomePage/Newsletter/Newsletter";
import ProjectsSection from "@/components/HomePage/Projects/ProjectsSection";
import ServiceSection from "@/components/HomePage/Services/ServiceSection";
import Partners from "@/components/HomePage/Partners/Partners";

export default function Home() {
  return (
    <Layout>
      <Gradient>
        <div className="grid gap-10">
          <HeroSection />
          <CategoriesSection />
          <ServiceSection />
          <JobsSection />
          <ProjectsSection />
          <Newsletter />
          <Partners />
        </div>
      </Gradient>
    </Layout>
  );
}
