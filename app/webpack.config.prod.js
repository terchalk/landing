const autoprefixer  = require('autoprefixer'),
    webpack         = require("webpack"),
    path            = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:
    {
        app: './index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'resource/js/[name].js',
        sourceMapFilename:'[name]-map.json',
        publicPath:  '/',
        chunkFilename:'[name].js'
    },
    module: {
        rules: [
            {   
                test: /\.jsx?$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/,
                query: {presets: ['es2015', 'stage-0', 'react']}
            },
            {
                test: /\.js$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/,
                query: {presets: ['es2015', 'stage-0', 'react']}
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=51200'
            },
            {
                test: /\.svg(\??.*)$/, 
                loader: "url?limit=10000&mimetype=image/svg+xml" 
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//, 
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /bootstrap\/dist\/js\/umd\//, 
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(["css-loader", "postcss-loader"])
            },
            {
                test: /styles\/.*\.scss$/,
                use: ExtractTextPlugin.extract(["css-loader", "postcss-loader", "sass-loader"])
            },
            {
                test: /\.scss$/,
                exclude: /styles\//,
                use: ExtractTextPlugin.extract(["css-loader?modules&importLoaders=2&localIdentName=[name]__[local]", 
                    "postcss-loader", "sass-loader"])
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            sassResources: [
              './app/styles/_variables.scss'
            ],
            postcss:[ autoprefixer({ browsers: ['> 1%', 'last 2 versions'] }) ]
          }
        }),
        new ExtractTextPlugin({filename: 'resource/css/[name]-bundle.css', allChunks: true}),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: false
        }),
    ],
    resolve: {
        modules: [path.resolve('./app'), 'node_modules'],
        extensions: ['.js', '.json', '.jsx', '.coffee']
    },
    devServer: {
        publicPath: "/",
        contentBase: "./public",
        historyApiFallback: {
          index: 'index.html'
        },
        port: 2001,
        hot: true,
        inline: true
    }
};
