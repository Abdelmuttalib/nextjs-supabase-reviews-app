import Head from "next/head";
import Link from "next/link";
import { Layout, Auth } from "../src/components";
import styles from "../src/components/Layout/layout.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Review App</title>
        <meta name="description" content="Nextjs Supabase Reviews App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Link href="/auth" className={styles.link}>
          <h2>Sign in or Sign up Page</h2>
        </Link>
        <Link href="/profile" className={styles.link}>
          <h2>Profile Page</h2>
        </Link>
      </Layout>
    </>
  );
}
