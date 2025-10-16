// website/src/components/layout/Layout.jsx
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  
  // Pages dengan banner yang harus start dari top (seperti homepage)
  const pagesWithBanner = ['/', '/produk', '/about-us', '/contact-us', '/portofolio', '/artikel'];
  const hasBanner = pagesWithBanner.includes(router.pathname);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Tidak ada padding untuk halaman dengan banner */}
      <main className={`flex-grow ${hasBanner ? '' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}