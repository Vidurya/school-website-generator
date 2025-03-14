/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['cdn.school.edu'], // Add your CDN domain here
    },
    // Company-enforced configurations
    poweredByHeader: false,
    compress: true,
    productionBrowserSourceMaps: false,
  };
  
module.exports = nextConfig;