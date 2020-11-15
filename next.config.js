const images = require('remark-images')
const emoji = require('remark-emoji')
const path = require('path')

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [images, emoji]
      }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})
