/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Remove cloudinary if it was there
  },
  // For serving uploaded files in development
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

module.exports = nextConfig;