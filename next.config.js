/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '127.0.0.1', 'images.pexels.com', 'avatar.iran.liara.run'],
  },
    eslint: {
    ignoreDuringBuilds: true,
  },
    typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

