import Head from "next/head";
import React from "react";
import { Auth, Layout } from "../../src/components";

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>Sign in or Sign Up</title>
      </Head>

      <Layout>
        <Auth />
      </Layout>
    </>
  );
};

export default AuthPage;
