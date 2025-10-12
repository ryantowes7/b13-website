import Head from 'next/head';
import { useState, useEffect } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ProductCategories from '@/components/home/ProductCategories';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    // Load site data for meta tags
    const loadSiteData = async () => {
      try {
        const response = await fetch('/api/content/site-config');
        if (response.ok) {
          const data = await response.json();
          setSiteData(data);
        } else {
          throw new Error('Failed to load site data');
        }
      } catch (error) {
        console.log('Using default site data');
        setSiteData({
          title: 'B13 Factory - Garment & Advertising Specialist',
          description: 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'
        });
      }
    };

    loadSiteData();
  }, []);

  return (
    <>
      <Head>
        <title>{siteData?.title || 'B13 Factory - Garment & Advertising Specialist'}</title>
        <meta name="description" content={siteData?.description || 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'} />
        <meta name="keywords" content="garment, advertising, sablon, bordir, banner, kaos, seragam, jember, b13 factory, printing, merchandise" />
        <meta name="author" content="B13 Factory" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={siteData?.title || 'B13 Factory - Garment & Advertising Specialist'} />
        <meta property="og:description" content={siteData?.description || 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://b13factory-garmentadv.netlify.app" />
        <meta property="og:image" content="/uploads/og-image.jpg" />
        <meta property="og:site_name" content="B13 Factory" />
        <meta property="og:locale" content="id_ID" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteData?.title || 'B13 Factory - Garment & Advertising Specialist'} />
        <meta name="twitter:description" content={siteData?.description || 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'} />
        <meta name="twitter:image" content="/uploads/og-image.jpg" />
        
        {/* Additional Meta Tags */}
        <link rel="canonical" href="https://b13factory-garmentadv.netlify.app" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0066B3" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "B13 Factory",
              "description": "Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.",
              "url": "https://b13factory-garmentadv.netlify.app",
              "telephone": "+62-812-3456-7890",
              "email": "b13factory@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "JL. Arowana, Perum Kebon Agung Indah",
                "addressLocality": "Jember",
                "addressRegion": "Jawa Timur",
                "addressCountry": "Indonesia"
              },
              "openingHours": "Mo-Su 09:00-17:00",
              "areaServed": "Jember dan sekitarnya",
              "sameAs": []
            })
          }}
        />
      </Head>

      <main className="overflow-hidden">
        <HeroBanner />
        <FeaturedProducts />
        <ProductCategories />
        <PortfolioShowcase />
        <ContactSection />
      </main>
    </>
  );
}