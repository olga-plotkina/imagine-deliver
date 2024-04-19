const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const SvgSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = env => {
  const isProduction = env.mode === 'production';

  const webpackConfig = {
    mode: env.mode,
    devtool: isProduction ? false : 'inline-source-map',
    resolve: {
      alias: {
        'resources#': 'public',
      },
    },
    entry: './public/index.js',

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      clean: true,
    },

    devServer: {
      open: true,
      port: 9000,
    },

    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html' }),
      new MiniCssExtractPlugin({ filename: 'styles.css' }),
      //   new SvgSpritemapPlugin('./src' + '/svg/*.svg', {
      //     output: {
      //       filename: 'sprite.svg',
      //       svgo: false,
      //     },
      //     sprite: {
      //       prefix: false,
      //       generate: {
      //         title: false,
      //       },
      //     },
      //   }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
        },
        {
          test: /\.(sc|c)ss$/,
          use: isProduction
            ? ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            : ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /public\/css\/common\.scss/,
          use: isProduction
            ? [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
              ]
            : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          // More information here https://webpack.js.org/guides/asset-modules/
          type: 'asset',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
        {
          test: /\.hbs$/,
          use: 'handlebars-loader',
        },
      ],
    },
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new CompressionPlugin({
        // filename: '[path][base].gz',
        algorithm: 'gzip', // Значение по-умолчанию. Оставил для наглядности
        compressionOptions: {
          level: 9, // Значение по-умолчанию. Максимальный уровень
        },
      })
    );

    // webpackConfig.plugins.push(
    //   new CompressionPlugin({
    //     algorithm: 'brotliCompress',
    //     compressionOptions: {
    //       params: {
    //         [zlib.constants.BROTLI_PARAM_QUALITY]:
    //           zlib.constants.BROTLI_MAX_QUALITY,
    //       },
    //     },
    //   })
    // );

    webpackConfig.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            filename: '[name].async-module.js',
          },
        },
      },
    };
  }

  //   if (env.watch) {
  //     const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
  //     webpackConfig.plugins.push(
  //       new BrowserSyncPlugin(
  //         {
  //           host: 'localhost',
  //           //   proxy: `http://${host}:8888`,
  //           proxy: 'localhost:8888',
  //           open: 'external',
  //           port: 4000,
  //           files: [
  //             '/**/*.html',
  //             './build' + '/**/*.js',
  //             './build' + '/**/*.css',
  //           ],
  //         },
  //         {
  //           reload: false,
  //         }
  //       )
  //     );
  //   }

  return webpackConfig;
};
