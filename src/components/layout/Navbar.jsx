import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <Link href="/">
        <span className="font-bold text-2xl cursor-pointer">Nama Perusahaan</span>
      </Link>
      <div className="flex gap-8 font-medium">
        <Link href="/produk">Produk</Link>
        <Link href="/artikel">Artikel</Link>
        <Link href="/about">About Us</Link>
        <Link href="/portofolio">Portofolio</Link>
        <Link href="/contact">Contact Us</Link>
      </div>
    </nav>
  );
}