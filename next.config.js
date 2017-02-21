const webpack = require('webpack')

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API': JSON.stringify(process.env.API),
        'process.env.CDN': JSON.stringify(process.env.CDN)
      })
    )

    return config
  }
}
