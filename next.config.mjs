/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['v2.delabwallet.com', 'avatars.githubusercontent.com', 'raw.githubusercontent.com', 'ton.app'],
    },
  }

export default nextConfig;
