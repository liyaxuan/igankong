var path = require('path');
var less = require('less');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entry = {};
var htmlwebpackplugin = [];

var pages = ['index', 'notice', 'plan', 'hand',
'exposure_index', 'exposure_check', 'exposure_history', 'exposure_report_get', 'exposure_report_post',
'source_check', 'report', 'launch'];

pages.forEach(function (page) {
    entry[page] = `./src/js/${page}.js`;
});

// pages.forEach(function (page) {
//     htmlwebpackplugin.push(new HtmlWebpackPlugin({
//         template: `./src/template/${page}.html`,
//         filename: `./${page}.html`,
//         chunks: [page, 'vendor'],
//         hash: true, 
//     }));
// });

entry.vendor = ['vue', 'vue-resource', 'jquery'];

module.exports = {
    entry: entry,
    output: {
        path: './dist',
        filename: '[name].dist.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $ : 'jquery',
            Vue : 'vue',
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            }, {
                test: /\.less$/,
                loaders: ['style', 'css', 'less'],
            }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-0']
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.js'
        }
    }
};