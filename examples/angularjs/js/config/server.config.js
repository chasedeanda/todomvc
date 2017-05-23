module.exports = function (ROOT) {
    return {
        // messages for errors or HMR (quite verbose)
        // Possible values are none, error, warning or info (default).
        clientLogLevel: 'none',

        host: '0.0.0.0',
        contentBase: ROOT,
        historyApiFallback: true,
        port: 9000
    };
};
