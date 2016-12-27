module.exports = {
  entry: ['./src/fireworks.js'],
  output: {
    path: 'build',
    filename: './bundle.js'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'

      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|vendor)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
