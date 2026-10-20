/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io'],
      },
    experimental: {
      esmExternals: true,
    },
};

export default nextConfig;
