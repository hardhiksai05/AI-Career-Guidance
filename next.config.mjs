/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;

