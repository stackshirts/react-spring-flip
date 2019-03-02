const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withSass({
  target: 'serverless',
  webpack: (config) => {
    config.watch = true
    config.watchOptions = {
      ignored: /node_modules\/(?!(react-spring-flip)\/).*/,
    }
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    )

    return config
  },
}))
