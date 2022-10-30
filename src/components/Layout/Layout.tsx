import Image from "next/image";
import { ReactNode } from "react";
import styles from "./layout.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h4>Next App</h4>
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
