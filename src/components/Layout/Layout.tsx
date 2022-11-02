import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import styles from "./layout.module.css";
import cn from "classnames";

const Header = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const { pathname } = useRouter();
  const links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/peer-review",
      label: "Peers Review",
    },
    {
      href: "/profile",
      label: "Profile",
    },
  ];

  return (
    <header className={styles.header}>
      <Link href="/">
        <h4>Next App</h4>
      </Link>

      <nav className={styles.navLinks}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(styles.link, {
              [styles.activeLink]: pathname === `${href}`,
            })}
          >
            {label}
          </Link>
        ))}

        {/* Sign In  */}
        {!user && (
          <Link href="/auth" className={styles.authButton}>
            Sign In
          </Link>
        )}

        {/* Sign Out */}
        {user && (
          <button
            type="button"
            className={styles.authButton}
            onClick={async () => await supabaseClient.auth.signOut()}
          >
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  );
};

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
