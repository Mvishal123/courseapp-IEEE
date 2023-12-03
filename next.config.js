/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["utfs.io", "cdn-icons-png.flaticon.com"],
  },
};

module.exports = nextConfig;
