const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,  
  images: {
    domains: ['lh3.googleusercontent.com']
  }
}

module.exports = withVanillaExtract(nextConfig)
