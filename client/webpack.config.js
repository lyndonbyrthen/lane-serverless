const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['./src/main.js', './src/main.scss'],
  mode: 'production',
  // devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../dist-assets'),
    filename: 'js/[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './assets/images', to: 'images' }
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/[name].css',
            },
          },
          'extract-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: false
  }
}
