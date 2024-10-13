/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['sp.yimg.com', 'clipground.com'],
      },
      devIndicators: {
        autoPrerender: false,
      },
}

module.exports = nextConfig
