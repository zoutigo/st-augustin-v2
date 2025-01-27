import path from 'path';

/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://www.ecole-st-augustin.fr'
        : 'http://localhost:3001',
  },
  experimental: {
    workerThreads: false, // Désactiver les threads pour limiter la charge
    cpus: 1, // Forcer Next.js à utiliser un seul CPU
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
    if (!dev) {
      // Limiter le nombre de threads pour éviter de surcharger le serveur
      config.parallelism = 2;
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
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)', // Applique à toutes les routes
  //       headers: [{ key: 'X-Forwarded-Proto', value: 'https' }],
  //     },
  //   ];
  // },
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
