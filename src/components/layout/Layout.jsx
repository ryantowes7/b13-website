// website/src/components/layout/Layout.jsx
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hanya tambah padding jika bukan home page */}
      <main className={`flex-grow ${isHomePage ? '' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}