const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeModules = {};
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  name: 'server',
  target: 'node', // Menargetkan Node.js
  entry: './src/index.js', // Titik masuk aplikasi Anda
  output: {
    path: path.resolve(__dirname, 'bin'), // Lokasi output
    filename: 'index.js', // Nama file output
  },
  externals: nodeModules, // Modul eksternal
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/, // Mengecualikan node_modules
        use: {
          loader: 'babel-loader', // Loader untuk JavaScript dan JSX
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Preset Babel
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset/resource', // Mengatur jenis aset
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // Definisi variabel lingkungan
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/views', to: 'views' },
        { from: 'src/data', to: 'data' },
      ],
    }),
  ],
};
