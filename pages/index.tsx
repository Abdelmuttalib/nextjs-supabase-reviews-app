import Head from "next/head";
import { Layout, Auth } from "../src/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Review App</title>
        <meta name="description" content="Nextjs Supabase Reviews App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Auth />
      </Layout>
    </>
  );
}
