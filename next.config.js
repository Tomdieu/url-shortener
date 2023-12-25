/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: [
        //     "lh3.googleusercontent.com",
        //     "avatars.githubusercontent.com",
        //     "ui.shadcn.com",
        //     "*.*"
        // ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname: '**',
              },
              {
                protocol: 'https',
                hostname: 'ui.shadcn.com',
                pathname: '**',
              },
              {
                protocol: 'https',
                hostname: '**.*',
              },
          ],
    },
    experimental: {
      // ppr: true,
    },
};

module.exports = nextConfig;
