"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
const deploy = require("./deploy");

module.exports = {
  // 多入口所在位置，默认为views，修改这里的配置的同时，也要同时重命名/src/views的这个文件夹名称
  entryPath: ["views"],
  defaultEntery: {
    html: "index",
    js: "./src/index"
  },
  dev: {
    env: require("./dev.env"),
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {},
    // local develop enviroment config
    externalJs: "/static/utilty.js", // CDN 或者项目公用库静态文件，直接引入
    // corsMainPort: 30000, // 跨域主端口
    // corsDomain: 'http://cors.domain.com', // 跨域的域名

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map", // 如果要比较舒适的调试的话请用 'source-map', 不过这个会影响编译速度

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    env: require("./prod.env"),
    // production develop enviroment config
    externalJs: deploy.externalJs, // CDN 或者项目公用库静态文件，直接引入
    // corsMainPort: deploy.corsMainPort, // 线上跨域主端口
    // corsDomain: deploy.corsDomain, // 线上跨域的域名
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
