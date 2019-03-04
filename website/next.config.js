const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const path = require('path')

module.exports = withCSS(withSass({
  target: 'serverless',
  webpack: (config) => {
    config.watch = true
    config.watchOptions = {
      ignored: /node_modules\/(?!(react-spring-flip|react-spring)\/).*/,
    }
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    )
    // Object.assign(config.resolve.alias, {
    //   react: path.resolve('../node_modules/react'),
    //   'react-dom': path.resolve('../node_modules/react-dom')
    // })
    return config
  },
}))
