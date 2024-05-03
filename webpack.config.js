const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        chunks: ['main'],
        minify: false,
      }),
      new HtmlWebpackPlugin({
        template: './public/about.html',
        filename: 'about.html',
        chunks: ['about'],
        minify: false,
      }),
      new HtmlWebpackPlugin({
        template: './public/process.html',
        filename: 'process.html',
        chunks: ['process'],
        minify: false,
      }),
      new HtmlWebpackPlugin({
        template: './public/vision.html',
        filename: 'vision.html',
        chunks: ['vision'],
        minify: false,
      }),
      new HtmlWebpackPlugin({
        template: './public/careers.html',
        filename: 'careers.html',
        chunks: ['careers'],
        minify: false,
      }),
      new MiniCssExtractPlugin({ filename: 'styles.css' }),
      new CopyPlugin({
        patterns: [
          { from: 'public/images', to: 'images' }, // Copy images from public/images to build/images
        ],
      }),
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
          test: /\.(ico|gif|png|jpg|jpeg)$/i,
          use: isProduction
            ? [
                {
                  loader: 'file-loader',
                  options: {
                    outputPath: './build/images', // Specify the output directory for images
                    name: '[name].[ext]',
                  },
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                      quality: 65,
                    },
                    // Optipng settings
                    optipng: {
                      enabled: false,
                    },
                    // PNGquant settings
                    pngquant: {
                      quality: [0.65, 0.9],
                      speed: 4,
                    },
                    // GIF lossy compression
                    gifsicle: {
                      interlaced: false,
                    },
                    // the webp option will enable WEBP
                    webp: {
                      quality: 75,
                    },
                  },
                },
              ]
            : [],
        },
        {
          test: /public\/css\/common\.scss$/,
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
          test: /\.(sc|c)ss$/,
          exclude: /public\/css\/common\.scss$/,
          use: isProduction
            ? ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            : ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
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
