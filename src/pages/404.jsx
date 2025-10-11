import Head from 'next/head';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - B13 Factory</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary-100 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Page Not Found</h2>
            <p className="text-neutral-600 mb-8">
              Maaf, halaman yang Anda cari tidak ditemukan. 
              Mungkin halaman telah dipindah atau dihapus.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" variant="primary" className="flex items-center justify-center">
              <Home size={20} className="mr-2" />
              Back to Home
            </Button>
            <Button href="/contact-us" variant="outline" className="flex items-center justify-center">
              <ArrowLeft size={20} className="mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}