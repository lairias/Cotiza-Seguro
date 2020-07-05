const path = require('path');

module.exports = {
    entry: ['./src/js/app.js', './src/js/app_EM6.js'],
    output: {
        filename: 'bundler.js',
        path: path.join(__dirname, '/dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, 
                { loader: 'css-loader' }]
            }
        ]
    }
};
