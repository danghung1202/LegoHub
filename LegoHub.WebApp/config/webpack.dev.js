const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');


/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = {
    ENV: ENV
};

module.exports = webpackMerge(commonConfig, {

    //devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',

    output: {
        /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
        path: helpers.root('dist'),

        /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
        filename: '[name].[chunkhash].bundle.js',

        /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
        sourceMapFilename: '[name].[chunkhash].bundle.map',

        /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    module: {

        rules: [
            /*
             * css loader support for *.css files (styles directory only)
             * Loads external css styles into the DOM, supports HMR
             *
             */
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [helpers.root('src', 'styles')]
            },

            /*
             * sass loader support for *.scss files (styles directory only)
             * Loads external sass styles into the DOM, supports HMR
             *
             */
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                include: [helpers.root('src', 'styles')]
            },

        ]

    },

    plugins: [

        /**
       * Plugin: ExtractTextPlugin
       * Description: Extracts imported CSS files into external stylesheet
       *
       * See: https://github.com/webpack/extract-text-webpack-plugin
       */
        new ExtractTextPlugin('[name].css'),

        /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
        // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            'ENV': JSON.stringify(METADATA.ENV),
            'process.env': {
                'ENV': JSON.stringify(METADATA.ENV),
                'NODE_ENV': JSON.stringify(METADATA.ENV),
            }
        }),

        /**
         * Plugin LoaderOptionsPlugin (experimental)
         *
         * See: https://gist.github.com/sokra/27b24881210b56bbaff7
         */
        new LoaderOptionsPlugin({
            debug: true,
            options: {

            }
        }),
    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
});