import Gradient from "@/components/GradientBG/Gradient";
import Layout from "@/components/Layout/Layout";
import ServicesDisplay from "@/components/ServicesPage/Main/ServicesDisplay";
import SearchBar from "@/components/TalentPage/Main/SearchBar";

export default function page({searchParams}) {
  return (
    <Layout>
      <Gradient>
        <SearchBar type={'services'} />
        <ServicesDisplay keyword={searchParams?.q} />
      </Gradient>
    </Layout>
  )
}
