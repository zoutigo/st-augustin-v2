import path from 'path';

/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  experimental: {
    // Augmenter la taille maximale du corps pour les Server Actions
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  typescript: {
    ignoreBuildErrors: false, // Ignore les erreurs TypeScript pendant le build
  },
  trailingSlash: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: !isProduction,
  productionBrowserSourceMaps: true,

  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias['@'] = path.resolve('./');
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   reactStrictMode: !isProduction,
//   swcMinify: true,
//   // swcLoader: true, // Utiliser SWC pour le chargement des modules

//   experimental: {
//     swcMinify: true, // Utiliser SWC pour la minification
//   },
//   webpack: (config, { dev }) => {
//     config.resolve.alias['@'] = path.resolve('./');
//     if (!dev) {
//       // Limiter le nombre de threads pour éviter de surcharger le serveur
//       config.parallelism = 2;
//     }

//     return config;
//   },
// };

export default nextConfig;
