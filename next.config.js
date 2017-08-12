// const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = {
  webpack: (config, { dev }) => {
    // Handle Sass: 'static/sass/default.scss' --> '.next/static/css/default.css'
    const entryFactory = config.entry

    config.entry = () => {
      return entryFactory().then(entry => {
        entry['default.css'] = './static/sass/default.scss'

        return entry
      })
    }

    config.plugins.push(new ExtractTextPlugin('static/css/default.css'))

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
              ].concat(dev ? [] : [cssnano()]),
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    })

    // Use Preact on client
    if (!dev) {
      config.resolve.alias = {
        'react': 'preact-compat/dist/preact-compat',
        'react-dom': 'preact-compat/dist/preact-compat'
      }
    }

    // Env variables
    // config.plugins.push(
    //   new webpack.DefinePlugin({
    //     'process.env.API': JSON.stringify(process.env.API)
    //   })
    // )

    // Stats
    // config.plugins.push(
    //   function () {
    //     this.plugin('done', function (stats) {
    //       require('fs').writeFileSync('./stats.json', JSON.stringify(stats.toJson(), null, '\t'))
    //     })
    //   }
    // )

    return config
  }
}
