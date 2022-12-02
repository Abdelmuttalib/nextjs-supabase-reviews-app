import Head from "next/head";
import Link from "next/link";
import { Layout, Auth } from "../src/components";
import styles from "../src/components/Layout/layout.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Nextjs Supabase Reviews App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 style={{ fontSize: "8rem", display: "inline", marginTop: "-2rem" }}>
          Welcome!
        </h1>
        <p
          style={{
            backgroundColor: "#1c1c1c",
            padding: "1rem",
            borderRadius: "0.5rem",
            fontWeight: "600",
          }}
        >
          Get Started
        </p>
        <Link href="/auth" className={styles["home-page-link"]}>
          <h2>Sign in or Sign up Page</h2>
        </Link>
      </Layout>
    </>
  );
}
