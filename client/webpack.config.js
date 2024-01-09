const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: './src/js/index.js',
            install: './src/js/install.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            
            new HtmlWebpackPlugin({
                
                template: './index.html',
                title: 'Webpack Plugin',
                favicon: './favicon.ico'
            }),

            new WebpackPwaManifest({
                name: 'Text Editor',
                short_name: 'TE',
                description: 'This is the Text Editor for the module 19 challenge for the OSU Flex Web Development Bootcamp.',
                crossorigin: 'use-credentials',
                start_url: '/',
                publicPath: '/',
                icons: [
                    {
                        src: path.resolve('./favicon.ico'),
                        sizes: [48, 72, 96]
                    }
                ]
            }),

            new MiniCssExtractPlugin(),
            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'src-sw.js'
            })
        ],
        module: {

            // I took this ruleset from activity 10 of Module 18.
            rules: [

                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {

                        loader: 'babel-loader',
                        options: {

                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
    };
};
