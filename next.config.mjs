import path from 'path';

/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
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

export default nextConfig;
