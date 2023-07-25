const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 存放less变量文件的路径
        path.resolve(__dirname, "./src/assets/less/parameter.less"),
      ],
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#ec6800",
          },
          javascriptEnabled: true,
        },
      },
      // 给 sass-loader 传递选项
      scss: {
        // sass-loader版本V8以上
        // prependData: '@import "~@/assets/common.scss";',
        // sass-loader版本V8以下
        // additionalData: '@import "~@/assets/common.scss";'
      },
    },
  },
  devServer: {
    // host: "localhost",
    port: 8080,
    proxy: {
      "/test": {
        target: "http://localhost:8089",
        changeOrigin: true,
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*", // 开启应用间的跨域访问
    },
  },
};
