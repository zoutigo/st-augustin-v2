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
    workerThreads: false, // Désactiver les threads pour limiter la charge
    cpus: 1, // Forcer Next.js à utiliser un seul CPU
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
    // Reduce dev file watchers to avoid EMFILE on some systems
    if (dev) {
      // next dev uses webpackDevMiddleware under the hood
      // Use glob strings to satisfy webpack schema
      config.watchOptions = {
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
        aggregateTimeout: 300,
        poll: 1000,
      };
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
