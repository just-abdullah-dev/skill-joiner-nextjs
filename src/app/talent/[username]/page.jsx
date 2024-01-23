import Layout from "@/components/Layout/Layout";
import DisplayTalent from "@/components/TalentPage/TalentDetail/DisplayTalent";

export default function page({params}) {
  return (
    <Layout> 
        <DisplayTalent username={params?.username} />
    </Layout>
  )
}
