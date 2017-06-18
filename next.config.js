const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const dev = process.env.NODE_ENV !== 'production'

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
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['last 10 versions', 'ie 10']
                })
              ].concat(dev ? [] : [
                cssnano()
              ]),
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
