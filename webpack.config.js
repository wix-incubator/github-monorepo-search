const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const assetsDir = path.resolve('.', 'src', 'assets');
const Asset = ([str]) => path.resolve(assetsDir, str);

const configuration = {
  mode: 'development',
  entry: {
    popup: path.resolve('.', 'src', 'popup.ts'),
    // content: path.resolve('.', 'src', 'content.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: false,
            configFile: 'tsconfig.json'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve('.', 'dist')),
    new HtmlWebpackPlugin({
      template: Asset`popup.html`,
      filename: 'popup.html',
      chunks: ["popup"]
    }),
    new CopyWebpackPlugin([{
      from: Asset`manifest.json`,
      transform: function (content, path) {
        return Buffer.from(JSON.stringify({
          ...JSON.parse(content.toString())
        }, null, 2))
      }
    },
    {
      from: Asset`*.png`,
      flatten: true,
    },
    {
      from: Asset`*.jpeg`,
      flatten: true,
    }]),
  ],
  resolve: {
    extensions: ['.js', '.ts']
  },
};

const prodConfiguration = {
  ...configuration,
  mode: 'production',
  devtool: 'none'
}
module.exports = process.env.PRODUCTION ? prodConfiguration : configuration;