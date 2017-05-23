const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT = __dirname + '/../../';
const PORT = '9000';

module.exports = (isProd) => {

    const appName = isProd ? '[name].[chunkhash].js' : 'app.bundle.js';

    let vendorFiles = [
        'angular',
        'angular-ui-router',
        'react',
        'lodash'
    ];
    if(!isProd){
        vendorFiles = vendorFiles.concat([
            'webpack-dev-server/client?http://localhost:' + PORT,
            'webpack/hot/only-dev-server'
        ]);
    }

    let appFiles = ['app.js'];

    const cssPlugin = new ExtractTextPlugin({
        filename: isProd ? 'style.[contenthash].css' : 'style.bundle.css',
        allChunks: true
    });

    return {
        context: `${ROOT}/js`,
        entry: {
            app: appFiles,
            vendor: vendorFiles
        },
        output: {
            path: ROOT + '/dist',
            filename: appName,
            publicPath: isProd ? '/' : 'http://localhost:9000/'
        },
        module: {
            rules: require('./rules.config')(cssPlugin, ROOT, isProd)
        },
        plugins: require('./plugins.config')(cssPlugin, isProd, ROOT),
        devtool: 'none',
        devServer: require('./server.config')(ROOT),
        resolve: { modules: [ROOT + '/js', 'node_modules'], extensions: ['.js', '.scss'] },
    }
};
