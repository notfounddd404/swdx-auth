module.exports = {
  //路径前缀
  publicPath: "/",
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    });
    const entry = config.entry('app');
    entry.add('babel-polyfill').end();
    entry.add('classlist-polyfill').end();
    entry.add('@/mock').end();
  },
  css: {
    extract: { ignoreOrder: true }
  },
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 6688,
    proxy: {
      '/api': {
        //本地服务接口地址
        // target: 'http://localhost:9566',
        //远程演示服务地址,可用于直接启动项目
        target: 'http://124.70.216.140:16688/api',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};
