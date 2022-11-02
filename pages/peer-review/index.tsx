import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import Head from "next/head";
import React from "react";
import { Layout, PeerReview } from "../../src/components";

const PeerReviewPage = () => {
  return (
    <>
      <Head>
        <title>Peers Review</title>
      </Head>

      <Layout>
        <PeerReview />
      </Layout>
    </>
  );
};

export default PeerReviewPage;
export const getServerSideProps = withPageAuth({ redirectTo: "/auth" });
