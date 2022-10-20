const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getConfig=(options)=>{
    const config = {
    //   entry: './src/index.js',
      entry: options.paths.entry,
      output: {
        // path: path.resolve(__dirname, 'dist'),
        path: options.paths.output,
        filename: '[name].[contenthash].js'
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id=\"app\"></div></body></html>',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin(),
        // new CopyPlugin({
        //   patterns: [{ from: 'src/index.html' }],
        // })
      ],
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                  loader:'sass-loader',
                  options: {
                    implementation: require("sass"),
                  }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          }
        ]
      }
    };
    const compiler = webpack(config)

    const watching = compiler.watch(
        {
          aggregateTimeout: 300,
          poll: undefined,
        },
        (err, stats) => {
            if (err) {
              console.error(err.stack || err);
              if (err.details) {
                console.error(err.details);
              }
              return;
            }
        
            const info = stats.toJson();
        
            if (stats.hasErrors()) {
              console.error(info.errors);
            }
        
            if (stats.hasWarnings()) {
              console.warn(info.warnings);
            }

            if(!err && !stats.hasErrors()){
                console.log("App is running fine")
            }
        
          }
      );
}

module.exports = getConfig;