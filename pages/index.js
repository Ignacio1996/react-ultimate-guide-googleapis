import Head from "next/head";
import Image from "next/image";
import { SubscribeForm } from "../components/Header";
import { TableOfContents } from "../components/TableOfContents";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>React & Google APIs </title>
        <meta
          name="description"
          content="Learn Google APIs with React & Node.js"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <SubscribeForm />
        <TableOfContents />
      </main>

      <footer className={styles.footer}>
        <a
          // href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by <div className="font-bold ml-1">Ignacio Aguirre</div>
          {/* <span className={styles.logo}> */}
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          {/* </span> */}
        </a>
      </footer>
    </div>
  );
}
