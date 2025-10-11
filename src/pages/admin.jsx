import { useEffect } from 'react';
import Head from 'next/head';

export default function Admin() {
  useEffect(() => {
    // Load Netlify CMS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/netlify-cms@^2.10.0/dist/netlify-cms.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Admin - B13 Factory</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div id="nc-root" />
    </>
  );
}