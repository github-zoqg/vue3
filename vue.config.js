const path = require("path");
const cdnJs = {
  // 第三方依赖
  vue: "https://unpkg.com/vue@3.4.21/dist/vue.global.js",
  VueRouter: "https://unpkg.com/vue-router@4.1.6/dist/vue-router.global.js",
  // VueI18n:
  //   "//s1.e.vhall.com/common-static/middle/vue-i18n/8.26.7/vue-i18n.min.js",
  ElementUi: "https://unpkg.com/element-plus@2.3.3/dist/index.full.js",
  // html2canvas:
  //   "//s2.e.vhall.com/common-static/middle/html2canvas/1.0.0-rc.4/html2canvas.min.js",
  // dayjs: "//s2.e.vhall.com/common-static/middle/dayjs/1.10.8/dayjs.min.js",
};
// cdn css
let cdnCss = {
  ElementUi: "https://unpkg.com/element-plus@2.3.3/dist/index.css",
};
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
  chainWebpack: (config) => {
    config.plugin("html").tap((options) => {
      options[0].cdnJs = cdnJs;
      options[0].cdnCss = cdnCss;
      // options[0].version = process.VUE_CLI_SERVICE.pkg.version;
      // options[0].gitlabHash = argv.hash; //gitlab jenkins对应的项目hash
      return options;
    });
  },
  configureWebpack: {
    // 防止将某些 import 的包(package)打包到 bundle 中
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      "vue-i18n": "VueI18n",
      // moment: 'moment',
      "element-plus": "ElementPlus",
      "middle-domain": "middleDomain",
      // vant: 'vant',
      "vh5-ui": "vant",
      // lodash: "_",
      html2canvas: "html2canvas",
      overlayscrollbars: "OverlayScrollbars",
    },
  },
  productionSourceMap: false,
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
