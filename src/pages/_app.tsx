import Snackbar from "@/components/Snackbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Grof Co</title>
        <meta name="description" content="Financing features from SproutAsia" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main>
        <Snackbar />
        <Component {...pageProps} />
      </main>
    </Fragment>
  )
}
