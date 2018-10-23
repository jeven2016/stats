var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    progress: true,

    entry: {
        lib: [
            //使用代码热替换在开发的时候无需刷新页面即可看到更新，而且，它将构建的内容放入内在中，能够获得更快的构建编译性能，因此是官方非常推荐的一种构建方式。
            'webpack/hot/dev-server',
            'webpack/hot/only-dev-server',

            path.join(__dirname, 'client/entry.js')],

        //react related libraries
        rl: [
            "react",
            "react-dom",
            "react-motion",
            "react-redux",
            "react-router",
            "react-router-redux",
            "redux",
            "redux-logger",
            "redux-thunk"
        ],

        //将第三方分开打包
        vendor: [
            "es6-promise",
            "immutable",
            "is_js",
            "isomorphic-fetch",
            "whatwg-fetch",
            "moment"
        ],

        //chart related libraries
        chart: [
            "react-echarts"
            // "echarts"
        ]
    },

    output: {
        path: __dirname,
        filename: "build/[name].js"
    },

    plugins: [
        // Enables Hot Modules Replacement热部署
        new webpack.HotModuleReplacementPlugin(),

        // Allows error warnings but does not stop compiling.
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),

        //第三方公共包依赖
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.optimize.CommonsChunkPlugin('rl', 'rl.js'),
        new webpack.optimize.CommonsChunkPlugin('chart', 'chart.js'),

        //enable devTools in development environment
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse('true'))
        }),

        //https://github.com/webpack/webpack/issues/2145
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],

    module: {
        //配置编译预处理器
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/} //代码检查组件
        ],

        presets: [
            'es2015',
            'stage-3'
        ],

        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel",
                exclude: [nodeModulesPath],

                query: {
                    compact: true,
                    presets: ['es2015', 'react', 'stage-3'], //enable stage-1 to support es7 syntax
                    plugins: [
                        'add-module-exports',
                        'transform-class-properties',
                        'transform-decorators-legacy',
                        'transform-object-assign',
                        'transform-function-bind',
                        'transform-runtime'
                    ]//the IE doesn't support Object.assign method and a error would encounter if no plugin transform the method.
                }
            },


            {test: /\.css$/, loader: "style!css"}, //会将CSS文件红的样式定义动态插入到页面的head部分
            {
                /*图片资源在加载时先压缩，然后当内容size小于~10KB时，会自动转成base64的方式内嵌进去，
                 这样可以减少一个HTTP的请求。当图片大于10KB时，则会在img/下生成压缩后的图片，命名是[hash:8].[name].[ext]的形式。
                 hash:8的意思是取图片内容hashsum值的前8位，这样做能够保证引用的是图片资源的最新修改版本，保证浏览器端能够即时更新*/
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=10000&name=build/images/[name].[ext]'

            },

            {test: /\.scss$/, loader: "style!css!resolve-url!sass"},
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]'
            }
        ]
    },

    resolve: {
        // Allow to omit extensions when loading these files
        extensions: ['', '.js', '.jsx', '.scss'],

        alias: {
            'react-wui': path.join(__dirname, 'react-wui/'),
            images: path.join(__dirname, 'client/static_resources/images'),
            fontAwesome: path.join(__dirname, 'client/static_resources/styles/3rd/fa/scss/font-awesome.scss'),

            //widgets directory
            i18n: path.join(__dirname, 'client/common/I18nResources'),
            FontIcon: path.join(__dirname, 'client/widgets/common/FontIcon')
        }
    },

    eslint: {
        failOnWarning: false
    },

    //在浏览器中直接调试我们的源码，在控制台的sources下，点开可以看到webpack://目录
    //https://github.com/webpack/webpack/issues/2145
    // devtool: 'cheap-module-eval-source-map',
    // devtool: 'source-map',
    devtool: 'inline-source-map',

    devServer: {
        host: "localhost",
        port: 5800,
        historyApiFallback: true, // 当刷新当前页面会出现404错误，所以需要在web server上设置该参数。（History API）
        hot: true,
        inline: true,
        progress: true,
        stats: {colors: true}
    }


};