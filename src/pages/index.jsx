// website/src/pages/index.jsx - Updated for CMS
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
    fetch('/content/settings/site.json')
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(err => {
        setSiteData({
          title: 'B13 Factory - Garment & Advertising',
          description: 'Specialist dalam garment dan advertising'
        });
      });
  }, []);

  return (
    <>
      <Head>
        <title>{siteData?.title || 'B13 Factory - Garment & Advertising'}</title>
        <meta name="description" content={siteData?.description || 'Specialist dalam garment dan advertising'} />
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