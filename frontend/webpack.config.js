module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/../backend/static',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};