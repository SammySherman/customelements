module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'raw-loader',
                    'extract-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    attributes: false,
                },
            },
        ],
    },
};
