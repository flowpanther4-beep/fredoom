
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dummyimage.com' },
      { protocol: 'https', hostname: 'placehold.co' }
    ]
  }
};
module.exports = nextConfig;
