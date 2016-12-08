var path = require('path');
var less = require("less");
var ROOT_PATH = path.resolve(__dirname);
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');
var webpack = require('webpack');
var entry = {};
['index', 'notice', 'plan', 'hand',
'exposure_index', 'exposure_check', 'source_check', 'exposure_history', 'exposure_report',
'report'].forEach(function (item) {
    entry[item] = `./src/js/${item}.js`;
});

module.exports = {
    entry: entry,
    output: {
        path: DIST_PATH,
        filename: '[name].dist.js'
    },
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
            'vue$': 'vue/dist/vue.js'
        }
    },
};