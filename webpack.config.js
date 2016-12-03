var path = require('path');
var pkg = require(path.join(__dirname, "package.json"));
var dirs = pkg.configs.directories;
var webpack = require('webpack');

module.exports = {
    entry: {
      "rangepicker": path.join(__dirname, dirs.src, "rangepicker.vue"),
    },
    output: {
      path: path.join(__dirname, dirs.dist),
      library: '[name]',
      libraryTarget: 'umd',
      filename: "[name].js",
      sourceMapFilename: "[file].map"
    },
    resolve: {
      root: [
        path.resolve('./node_modules')
      ],
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                  presets: ['es2015']
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {   test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]);
}
