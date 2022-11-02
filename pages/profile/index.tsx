import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import Head from "next/head";
import React from "react";
import { Layout } from "../../src/components";
import ProfileImages from "../../src/components/ProfilePage/ProfileImages/ProfileImages";
import ProfileInfo from "../../src/components/ProfilePage/ProfileInfo/ProfileInfo";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <Layout>
        <ProfileInfo />
        {/* Divider */}
        <hr
          style={{
            margin: "5rem 0",
            color: "#202020",
            width: "100%",
            maxWidth: "1300px",
          }}
        />
        <ProfileImages />
      </Layout>
    </>
  );
};

export default ProfilePage;
export const getServerSideProps = withPageAuth({ redirectTo: "/auth" });
