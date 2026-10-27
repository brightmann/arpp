/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
  async redirects() {
    return [{ source: '/', destination: '/blog', permanent: false }]
  },
}

module.exports = withContentlayer(nextConfig)
