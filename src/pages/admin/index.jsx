import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Admin() {
    useEffect(() => {
    // Initialize CMS after mount
    console.log('Admin page mounted');
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <title>Content Manager - B13 Factory</title>
        <link href="https://unpkg.com/netlify-cms@^2.0.0/dist/cms.css" rel="stylesheet" />

        {/* Netlify Identity Widget */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <div id="nc-root"/>

      {/* Load Netlify CMS Script */}
      <Script 
        src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Netlify CMS loaded successfully');

          // Register custom preview styles
          if (window.CMS) {
            window.CMS.registerPreviewStyle("/admin-preview.css");
            console.log('CMS preview styles registered');
          }
        }}
        onError={(e) => {
          console.error('Failed to load Netlify CMS:', e);
        }}
      />

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        
        :root {
          --primary-color: #0066B3;
          --secondary-color: #FF6B35;
        }

        /* Loading indicator */
        #nc-root:empty::before {
          content: 'Loading CMS...';
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 18px;
          color: #666;
        }
      `}</style>
    </>
  );
}

// Disable layout untuk halaman admin
Admin.getLayout = function getLayout(page) {
  return page;
};