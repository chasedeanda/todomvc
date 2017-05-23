const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function plugins (cssPlugin, isProd, ROOT) {

    const vendorName = isProd ? '[name].[chunkhash].js' : 'vendor.bundle.js';

    const clean = new CleanWebpackPlugin(['./dist'], {
        root: ROOT,
        verbose: true,
        dry: false
    });
    const define = new webpack.DefinePlugin({
        RELEASE_VERSION: JSON.stringify(process.env.RELEASE || 'local'),
        GIT_COMMIT: JSON.stringify(process.env.GIT_COMMIT || 'local'),
        COMMIT_DATE: JSON.stringify(process.env.COMMIT_DATE || 'local'),
        ENVIRONMENT: JSON.stringify('local')
    });

    const css = new ExtractTextPlugin({
        filename: isProd ? 'style.[contenthash].css' : 'style.bundle.css',
        allChunks: true
    });

    const cssMinify = new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
            discardComments: {
                removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
        },
    });
    const chunk = new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: vendorName,
        minChunks: Infinity
    });
    const names = new webpack.NamedModulesPlugin();
    const force = new CaseSensitivePathsPlugin();
    const html = new HtmlWebpackPlugin({
        title: 'Research Now – ADimension',
        filename: 'index.html',
        template: ROOT + '/index.html'
    });
    const copy = new CopyWebpackPlugin([
        { from: ROOT + 'src/views', to: 'views' },
        { from: ROOT + 'src/assets', to: 'assets' }
    ]);
    const provide =  new webpack.ProvidePlugin({
        _: 'lodash',
        React: 'react'
    });
    const md5 = new WebpackMd5Hash();
    // ES6 minification
    const minify = new UglifyJSPlugin({
        output: {
            // output options: http://lisperator.net/uglifyjs/codegen
            indent_start: 0,
            indent_level: 0,
            beautify: true,
            semicolons: false // force line breaks
        },
        compress: {
            dead_code: false,
            drop_console: true,
            unused: true,
            warnings: false
        },
        mangle: false // disable property rewrites https://github.com/webpack-contrib/uglifyjs-webpack-plugin#mangling
    });

    const common = [define, chunk, html, provide, force]; // minify to test locally
    const dev = [names];
    const prod = [clean, cssPlugin, cssMinify, minify, md5];

    return isProd ?
        [...common, ...prod] :
        [...common, ...dev];
};
