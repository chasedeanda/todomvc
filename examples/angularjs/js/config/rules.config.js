module.exports = function (cssPlugin, ROOT, isProd) {
    const babel = {
        test: /\.js$/,
        use: [
            'babel-loader',
            'ng-annotate-loader'
        ],
        exclude: /node_modules/
    };
    const scss = {
        test: /\.s?css$/,
        use: cssPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
    };
    const inline_scss = {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
    };
    const angular = {
        test: require.resolve('angular'),
        use: [
            'exports-loader?window.angular'
        ]
    };
    const angularModules = {
        test: /\/angular(.min)?\.js$/,
        use: [
            'remove-angular-modules-loader?moduleName=av-web'
        ]
    };

    const common = [babel, angular];
    const dev = [inline_scss];
    const prod = [scss];

    return isProd ?
        [...common, ...prod] :
        [...common, ...dev];
}
