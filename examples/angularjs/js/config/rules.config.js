module.exports = function (cssPlugin, ROOT, isProd) {
    const babel = {
        test: /\.js$/,
        use: [
            'babel-loader'
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

    const common = [babel];
    const dev = [inline_scss];
    const prod = [scss];

    return isProd ?
        [...common, ...prod] :
        [...common, ...dev];
}
