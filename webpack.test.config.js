// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config
 */
module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [
                    root('node_modules')
                ]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [
                    root('node_modules/rxjs'),
                    root('node_modules/@angular')
                ]
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                query: {
                    "compilerOptions": {
                        "removeComments": true
                    }
                },
                exclude: [ /\.e2e\.ts$/,root('node_modules') ]
            },
            { test: /\.json$/, loader: 'json-loader',exclude: [ root('www/index.html'), root('node_modules') ]  },
            { test: /\.html$/, loader: 'raw-loader',exclude: [ root('www/index.html'), root('node_modules') ]  },
            { test: /\.css$/,  loader: 'raw-loader',exclude: [ root('www/index.html'), root('node_modules') ]  }
        ],
        postLoaders: [
            // instrument only testing sources with Istanbul
            {
                test: /\.(js|ts)$/,
                include: root('app'),
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            // Environment helpers
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV)
            }
        })
    ],
    // we need this due to problems with es6-shim
    node: {
        global: 'window',
        progress: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}