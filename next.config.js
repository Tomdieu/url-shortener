/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "ui.shadcn.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
