import Head from 'next/head';

export default function About() {  // <- HARUS ADA 'export default'
  return (
    <>
      <Head>
        <title>About Us - B13 Factory</title>
      </Head>
      <div className="min-h-screen bg-white">
        <div className="container-custom py-20">
          <h1 className="text-4xl font-bold mb-8">About Us</h1>
          <p>About page content...</p>
        </div>
      </div>
    </>
  );
}