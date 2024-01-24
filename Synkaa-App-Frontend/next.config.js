/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.externals.push({
          'utf-8-validate': 'commonjs utf-8-validate',
          'bufferutil': 'commonjs bufferutil',
        })
        return config
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'synkaa-uploads.s3.ap-southeast-1.amazonaws.com',
          },
        ],
      },
};

module.exports = nextConfig;
