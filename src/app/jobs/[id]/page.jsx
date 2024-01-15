import DisplayJob from "@/components/JobsPage/JobDetail/DisplayJob";
import Layout from "@/components/Layout/Layout";
import React from "react";

export default function page({ params }) {
  return (
    <Layout>
      <DisplayJob id={params?.id} />
    </Layout>
  );
}
