import Gradient from "@/components/BG/Gradient";
import CategoriesSection from "@/components/Categories/CategoriesSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import JobsSection from "@/components/Jobs/JobsSection";
import Layout from "@/components/Layout/Layout";
import Newsletter from "@/components/Newsletter/Newsletter";
import Partners from "@/components/Partners/partners";
import ProjectsSection from "@/components/Projects/ProjectsSection";
import ServiceSection from "@/components/Services/ServiceSection";

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
