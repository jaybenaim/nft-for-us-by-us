import Dashboard from "@components/Dashboard";
import Navbar from "@components/Organisms/Navbar";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NFT FUBU</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>

      <Navbar />

      <Dashboard />

      <footer className="flex flex-col p-6 text-center text-white/80 sm:p-12">
        <p>
          Created by{" "}
          <a
            href="https://jacobbenaim.ca"
            target="_blank"
            className="font-semibold hover:text-white hover:underline"
            rel="noreferrer"
          >
            Jacob Benaim
          </a>
        </p>

        <p>
          Shoutout to{" "}
          <a href="https://www.vecteezy.com/free-vector/line-drawing-face">
            Line Drawing Face Vectors by Vecteezy
          </a>
          for the amazing svg vector.
        </p>
      </footer>
    </>
  );
};

export default Home;
