import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const [favicon, setFavicon] = useState('');

  useEffect(() => {
    fetch('/content/settings/site.json')
      .then(res => res.json())
      .then(cfg => setFavicon(cfg.favicon));
  }, []);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        {favicon && <link rel="icon" href={favicon} />}
        {/* ...meta lain milikmu */}
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}