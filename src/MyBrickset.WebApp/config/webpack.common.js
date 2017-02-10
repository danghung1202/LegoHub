
var webpack = require('webpack');
const helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['*', '.js', '.ts', '.css', '.html', '.scss', '.json']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            /* Embed files. */
            {
                test: /\.(html)$/,
                loader: 'raw-loader',
                exclude: /\.async\.(html)$/,
                include: [helpers.root('src', 'app')]
            },
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader'],
                include: [helpers.root('src', 'app')]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader'
                }),
                exclude: [helpers.root('src', 'app')]
            },
            {
                test: /\.(scss|sass)$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
                include: [helpers.root('src', 'app')]
            },
            {
                test: /\.(scss|sass)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!sass-loader'
                }),
                exclude: [helpers.root('src', 'app')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        })
        // ,
        // new HtmlWebpackPlugin({
        //     template: 'index.html',
        //     //title: METADATA.title,
        //     chunksSortMode: 'dependency',
        //     //metadata: METADATA,
        //     inject: 'head'
        // }),
    ]
};
