//  Configuration file of webpack
var path = require("path");
var webpack = require("webpack");
var pkg = require("../package.json");
var dirs = pkg.configs.directories;
var VueLoader = require('vue-loader');

module.exports = {
  entry: {
    "demo": path.join(__dirname, "demo.js")
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue" }
    ]
  },
  vue: {
    loaders: {
      html: "raw"    // use raw-loader to process HTML
    }
  },
  resolve: {
    root: [__dirname],
    modulesDirectories: [ "lib" ]
  },
  plugins: [
  ],
  output: {
    path: __dirname,
    filename: "[name].entry.js",
    sourceMapFilename: "[file].map"
  },
};
