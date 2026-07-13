/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
                hostname: '**',
              },
          ],
    },
    experimental: {
      // ppr: true,
    },
};

export default nextConfig;
