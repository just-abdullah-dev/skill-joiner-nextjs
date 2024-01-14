import Gradient from "@/components/GradientBG/Gradient";
import Layout from "@/components/Layout/Layout";
import SearchBar from "@/components/ServicesPage/Main/SearchBar";
import ServicesDisplay from "@/components/ServicesPage/Main/ServicesDisplay";

export default function page({searchParams}) {
  return (
    <Layout>
      <Gradient>
        <SearchBar />
        <ServicesDisplay keyword={searchParams?.q} />
      </Gradient>
    </Layout>
  )
}
