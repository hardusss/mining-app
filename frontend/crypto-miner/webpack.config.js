const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for the bundled code
    filename: 'bundle.js', // Name of the bundled JavaScript file
    clean: true, // Clean the 'dist' folder before each build
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Supported file extensions
    fallback: {
      fs: false, // Disable 'fs' module
      path: require.resolve('path-browserify'), // Polyfill for the 'path' module
      crypto: require.resolve('crypto-browserify'), // Polyfill for 'crypto'
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Handling TypeScript files (.ts and .tsx)
        exclude: /node_modules/,
        use: 'ts-loader', // Use ts-loader to compile TypeScript
      },
      {
        test: /\.scss$/, // Handling .scss files
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/, // Handling .css files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Handling image files
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template
    }),
  ],
  devServer: {
    static: './dist', // Directory for static files
    port: 3000, // Local server port
    open: true, // Automatically open the browser
    hot: true, // Hot module replacement
  },
  mode: 'development', // Build mode (development or production)
};
