import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import CategoriesSection from "./Categories/CategoriesSection";
import ServiceSection from "./Services/ServiceSection";
import JobsSection from "./Jobs/JobsSection";
import ProjectsSection from "./Projects/ProjectsSection";
import Newsletter from "./Newsletter/Newsletter";
import Partners from "./Partners/Partners";
import ForClientSection from "./ForClient/ForClientSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ForClientSection />
      <CategoriesSection />
      <ServiceSection />
      <JobsSection />
      <ProjectsSection />
      <Newsletter />
      <Partners />
    </>
  );
}
