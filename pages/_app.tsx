import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../common/components/layout/layout";
import Head from "next/head";
import { NotificationContextProvider } from "../store/notifications-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
