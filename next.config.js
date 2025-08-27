/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    webpackBuildWorker: false
  }
}

module.exports = nextConfig