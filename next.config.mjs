import path from 'path';

/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  experimental: {
    workerThreads: false, // Désactiver les threads pour limiter la charge
    cpus: 1, // Forcer Next.js à utiliser un seul CPU
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore les erreurs TypeScript pendant le build
  },
  trailingSlash: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: !isProduction,
  swcMinify: false,
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
  async headers() {
    return [
      {
        source: '/(.*)', // Applique à toutes les routes
        headers: [{ key: 'X-Forwarded-Proto', value: 'https' }],
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
