import Head from "next/head";
import React from "react";
import { Layout } from "../../src/components";

const KeywordAnalysisPage = () => {
  return (
    <>
      <Head>
        <title>Keyword Analysis</title>
      </Head>

      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h1 style={{ fontSize: "5rem" }}>{`<Keyword Analysis />`}</h1>
        </div>
      </Layout>
    </>
  );
};

export default KeywordAnalysisPage;
