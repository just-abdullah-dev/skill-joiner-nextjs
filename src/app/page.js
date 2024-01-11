import Gradient from "@/components/BG/Gradient";
import HeroSection from "@/components/HeroSection/HeroSection";
import Layout from "@/components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Gradient>
        <div className="px-20">
          
        <HeroSection />
        Home Page
        </div>
      </Gradient>
    </Layout>
  );
}
