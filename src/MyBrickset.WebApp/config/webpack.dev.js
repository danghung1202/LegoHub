var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');

const path = require('path');
const rootDir = path.resolve(__dirname, '..');

console.log(__dirname);
console.log(rootDir);

module.exports = webpackMerge(commonConfig, {

    devtool: 'cheap-module-eval-source-map',
    //devtool: 'source-map',

    output: {
        //path: path.resolve(rootDir, 'MyBrickset.WebApi/wwwroot/scripts'),
        path: './dist',
        //publicPath: 'http://brickset.dev/',
        filename: '[name].js'
        //chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ]

    // devServer: {
    //     historyApiFallback: true,
    //     stats: 'minimal'
    // }
});