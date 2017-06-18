const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  webpack: (config) => {
    const entryFactory = config.entry

    // Handle Sass
    config.entry = () => {
      return entryFactory().then((entry) => {
        entry['default.css'] = './static/sass/default.scss'

        return entry
      })
    }

    config.plugins.push(
      new ExtractTextPlugin('../static/css/[name]')
    )

    config.module.rules.push({
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              url: false,
              minimize: true,
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    })

    // Env variables
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API': JSON.stringify(process.env.API),
        'process.env.CDN': JSON.stringify(process.env.CDN)
      })
    )

    return config
  }
}
