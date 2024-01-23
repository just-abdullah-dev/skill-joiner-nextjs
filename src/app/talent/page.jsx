import Gradient from "@/components/GradientBG/Gradient";
import Layout from "@/components/Layout/Layout";
import SearchBar from "@/components/TalentPage/Main/SearchBar";
import TalentsDisplay from "@/components/TalentPage/Main/TalentsDisplay";

export default function page({searchParams}) {
  return (
    <Layout> 
      <Gradient>
        <SearchBar type={'talent'} />
        <TalentsDisplay keyword={searchParams?.q} />
      </Gradient>
    </Layout>
  )
}
