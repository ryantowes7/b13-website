import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Favicon - Multiple formats untuk kompatibilitas semua browser */}
        {/* Default fallback favicon - akan di-override oleh _app.jsx dengan CMS config */}
        <link rel="icon" type="image/x-icon" href="/uploads/logo.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/uploads/logo.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/uploads/logo.ico" />
        <link rel="shortcut icon" href="/uploads/favicon.ico" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0066B3" />
        <meta name="msapplication-TileColor" content="#0066B3" />
        
        {/* Optimized Font Loading - Defer non-critical fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
        
        {/* Preload Critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS untuk above-the-fold content */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              
              /* Hide scrollbar during initial load */
              html {
                scrollbar-width: none;
              }
              body::-webkit-scrollbar {
                display: none;
              }
            `,
          }}
        />
        
        {/* DNS Prefetch untuk external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//maps.gstatic.com" />
        
        {/* Additional Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="B13 Factory" />
        
        {/* Structured Data untuk Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "B13 Factory",
              "alternateName": "B13 Factory Garment & Advertising",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
              "description": "Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "JL. Arowana, Perum Kebon Agung Indah",
                "addressLocality": "Jember",
                "addressRegion": "Jawa Timur",
                "postalCode": "68161",
                "addressCountry": "ID"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62-812-3456-7890",
                "contactType": "customer service",
                "email": "b13factory@gmail.com",
                "areaServed": "ID",
                "availableLanguage": ["Indonesian", "English"]
              },
              "sameAs": []
            })
          }}
        />
      </Head>
      <body className="bg-white text-neutral-900 antialiased">
        <Main />
        <NextScript />
        
        {/* Noscript fallback */}
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            color: 'black',
            zIndex: 9999,
            padding: '20px',
            textAlign: 'center'
          }}>
            <h1>JavaScript Required</h1>
            <p>This website requires JavaScript to function properly. Please enable JavaScript in your browser settings.</p>
          </div>
        </noscript>
      </body>
    </Html>
  );
}