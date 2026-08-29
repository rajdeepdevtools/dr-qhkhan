/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hospital/shared-types', '@hospital/validation', '@hospital/ui'],
};

export default nextConfig;
