/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize for modern browsers
  experimental: {
    modern: true,
  },
  // Reduce JavaScript payload
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;