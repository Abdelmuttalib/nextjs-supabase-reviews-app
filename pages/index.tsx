import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { Layout, Auth } from "../src/components";
import styles from "../src/components/Layout/layout.module.css";

export default function Home() {
  const user = useUser();
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
        {!user ? (
          <Link href="/auth" className={styles["home-page-link"]}>
            <h2>Sign in or Sign up Page</h2>
          </Link>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <Link href="/public-images" className={styles["home-page-link"]}>
              <h2>Public Images</h2>
            </Link>
            <Link href="/profile" className={styles["home-page-link"]}>
              <h2>Profile</h2>
            </Link>
          </div>
        )}
      </Layout>
    </>
  );
}
