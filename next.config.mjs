import path from 'path';

/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: !isProduction,
  swcMinify: true,
  webpack: (config, { dev }) => {
    config.resolve.alias['@'] = path.resolve('./');
    if (!dev) {
      // Limiter le nombre de threads pour éviter de surcharger le serveur
      config.parallelism = 2;
    }

    return config;
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
