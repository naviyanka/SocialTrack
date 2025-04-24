/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    unoptimized: true,
  },
  output: 'standalone',
  reactStrictMode: true,
}

export default nextConfig
