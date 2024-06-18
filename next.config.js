
const withImages = require('next-images')
module.exports = withImages({
  reactStrictMode: true,
  webpack(config) {
    return config
  },
  images: {
    disableStaticImages: true
  }
})