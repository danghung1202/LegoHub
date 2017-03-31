
const webpack = require('webpack');
const helpers = require('./helpers');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');

const AOT = helpers.hasNpmFlag('aot');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': AOT ? './src/main.aot.ts' : './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', '.css', '.scss', '.json'],
        // An array of directory names to be resolved to the current directory
        //modules: [helpers.root('src'), helpers.root('node_modules')],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                        loader: 'ng-router-loader',
                        options: {
                            loader: 'async-import',
                            genDir: 'compiled',
                            aot: AOT
                        }
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.webpack.json'
                        }

                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            /* Embed files. */
            {
                test: /\.(html)$/,
                loader: 'raw-loader',
                exclude: [helpers.root('src/index.html')]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [helpers.root('src', 'styles')]
            },
            {
                test: /\.(scss|sass)$/,
                use: ['to-string-loader', 'css-loader', 'sass-loader'],
                exclude: [helpers.root('src', 'styles')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [

        /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
        new CheckerPlugin(),

        new CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            helpers.root('src'), // location of your src
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),

        /*
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets' },
            { from: 'src/data', to: 'data' },
            { from: 'src/meta' },
            { from: 'src/index.html' },
            { from: 'src/favicon.ico' },
            { from: 'src/service-worker.js' },
        ]),

        /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
        new LoaderOptionsPlugin({}),

        // Fix Angular 2
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)async/,
            helpers.root('node_modules/@angular/core/src/facade/async.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)collection/,
            helpers.root('node_modules/@angular/core/src/facade/collection.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)errors/,
            helpers.root('node_modules/@angular/core/src/facade/errors.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)lang/,
            helpers.root('node_modules/@angular/core/src/facade/lang.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)math/,
            helpers.root('node_modules/@angular/core/src/facade/math.js')
        ),

        new ngcWebpack.NgcWebpackPlugin({
            disabled: !AOT,
            tsConfig: helpers.root('tsconfig.webpack.json'),
            resourceOverride: helpers.root('config/resource-override.js')
        }),

        // ,
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            //title: METADATA.title,
            chunksSortMode: 'dependency',
            //metadata: METADATA,
            inject: 'body'
        }),

        /*
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
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
}
