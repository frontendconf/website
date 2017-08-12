// const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const dev = process.env.NODE_ENV !== 'production'
const predeploy = process.env.PREDEPLOY === 'true'

module.exports = {
  webpack: config => {
    // Handle Sass
    if (dev || predeploy) {
      const entryFactory = config.entry

      config.entry = () => {
        return entryFactory().then(entry => {
          entry['default.css'] = './static/sass/default.scss'

          return entry
        })
      }

      config.plugins.push(
        new ExtractTextPlugin('static/css/default.css')
        // The following config does not work properly when running 'next build'
        // (targeting a directory outside does not seem to work at all and [name] refers to "common")
        // new ExtractTextPlugin('../static/css/[name]')
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
