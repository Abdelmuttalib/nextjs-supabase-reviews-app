import Head from "next/head";
import React from "react";
import { Layout } from "../../src/components";
import PublicImages from "../../src/components/PublicImagesPage/PublicImages";

const PublicImagesPage = () => {
  return (
    <>
      <Head>
        <title>Public Users Images</title>
      </Head>

      <Layout>
        <PublicImages />
      </Layout>
    </>
  );
};

export default PublicImagesPage;
