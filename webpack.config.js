const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const target = process.env.NODE_ENV === 'production' ? 'browserslist' : 'web';

module.exports = {
  mode,

  entry: {
    app: './src/js/app.js',
    team: './src/js/team.js',
    about: './src/js/about.js',
    apply: './src/js/apply.js',
  },

  output: {
    filename: mode === 'production' ? 'js/[name].[contenthash].chunk.js' : 'js/[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    assetModuleFilename: 'assets/[contenthash][ext]',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2|eot|woff|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },

  devtool: mode === 'production' ? false : 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 3000,
    open: true,
  },

  plugins: [
// Replace your existing CopyWebpackPlugin configuration with this:
new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'public/sitemap.xml'),
        to: 'sitemap.xml',
      },
      {
        from: path.resolve(__dirname, 'public/robots.txt'),
        to: 'robots.txt',
      },
      {
        from: path.resolve(__dirname, 'public'),
        to: '.',
        noErrorOnMissing: true,
        globOptions: {
          ignore: ['**/.*', '**/sitemap.xml', '**/robots.txt'], // Avoid duplicates
        },
      },
    ],
  }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      template: './src/team.html',
      filename: 'team.html',
      chunks: ['team'],
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: 'about.html',
      chunks: ['about'],
    }),
    new HtmlWebpackPlugin({
      template: './src/apply.html',
      filename: 'apply.html',
      chunks: ['apply'],
    }),

    new MiniCssExtractPlugin({
      filename: mode === 'production' ? 'css/[name].[contenthash].chunk.css' : 'css/[name].css',
    }),

    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimizer: [
      '...', // keep existing minimizers like terser
      new CssMinimizerPlugin(),
    ],
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  target,
};
