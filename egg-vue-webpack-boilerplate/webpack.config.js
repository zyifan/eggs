'use strict';
const path = require('path');
//  easywebpack-cli 配置文件 ${app_root}/webpack.config.js
module.exports = {
  egg: true,//特殊参数, 只有在使用 Egg 框架进行 Server Side Render 特殊配置, 需要设置为 true, 表示Webpack构建的服务端文件放到 app/view 目录
   // framework 支持 `js`,`html`, `vue`, `react`, `weex`
  framework: 'vue', // 使用 easywebpack-vue 构建解决方案
  entry: {
    // 必选, 文件根目录可以不写
    include: ['app/web/page'],// 自动遍历 app/web/page 目录下的 js 文件入口
    exclude: ['app/web/page/[a-z]+/component', 'app/web/page/elementjs'],//可选, 排除不需要构建的文件或目录,支持正则表达式.
    //loader 可选, 为 entry 配置模板, 当配置后, 可以根据 .vue 和 .jsx文件自动创建 entry 文件, key为 config.type 枚举值.
    // 在 Vue 项目构建时, 通过 loader 模板配置, 我们可以直接基于 .vue  作为入口文件
    // 如果没有配置loader模板，默认使用 .js 文件作为构建入口
    loader: {
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
    },
    // extMath: {String}:, 可选, entry目录查找时匹配文件后缀, 默认 .js, 当配置了 config.entry.loader 和 config.framework 参数,自动映射后缀.
    // template: {String} 可选, 当需要构建html文件时, 必选
    // html: {Object} 可选, 当只有部分页面需要创建html时, 可以配置该参数, 参数节点与 config.entry 一致, 具体见举例
  },
  // buildPath : Webpack的 output.path. easywebpack 已默认 ${app_root}/public, 无需配置
  // publicPath : Webpack的 output.publicPath. easywebpack 已默认 /public/, 无需配置
  //非必需, Webpack的 resolve.alias，对目录进行别名设置, 文件项目根目录可以不写
  alias: {
    server: 'app/web/framework/vue/entry/server.js',
    client: 'app/web/framework/vue/entry/client.js',
    app: 'app/web/framework/vue/app.js',
    asset: 'app/web/asset',
    component: 'app/web/component',
    framework: 'app/web/framework',
    store: 'app/web/store',
    vue: 'vue/dist/vue.js'
  },
  dll: ['vue', 'axios', 'vue-router', 'vuex', 'vuex-router-sync'],// webpack dll 构建,非必需，Array／Object, 配置需要打包出 webpack dll 的库或者公共 js 文件
  // loaders 默认可以不用配置，Webpack loader 配置, 支持自定义格式和原生格式.
  loaders: {
    // swig : {
    //   test: /\.html$/,
    //   use: ['html-loader', 'html-swig-loader']
    // }，
    // babel:false //禁用 easywebpack 内置的 babel-loader
    // babel:{//禁用 easywebpack 内置的 babel-loader
    //   enable:false
    // }
  },
  plugins: {
    serviceworker: true
  },
  // cdn.url: 可选, url为地址配置, 一般为线上环境使用
  // options : {Object} 可选 Webpack 原生配置, 当提供配置和API不满足要求时, 可以在这里配置 Webpack 所有原生配置
  // template:''
  optimization: {},
  done() {} // 编译完成回调, 默认可以不用配置,当你需要编译完成做某某事情(比如上传cdn)才需要配置
  // cssExtract : 非必需，{boolean}. 是否分离样式为独立css文件，vue ssr 开发模式(dev)默认为 false， 发布模式（test or prod）为 true
  // 开启 loader 和 plugin 插件自动检测功能
  /* install:{
    check: false // 默认禁用检测 loader 和 plugin 是否安装
    npm: 'npm'   // 动态安装时，默认采用 npm。 你可以使用 cnpm，tnpm等等 
  }*/
  // packs: js单独打包,可选, {Object} key:value 形式, 其中 key 为生成的文件名, value为要打包的文件
  // type : 需要结合 easywebpack-cli 使用的, 目前支持 client, server, web, weex, 其中 client 和 server 配对使用, web 和 weex 配对使用.
  
  /*
  devtool: 'source-map' Webpack 原生 devtool配置, 无默认, 自己配置, 只在开发环境 dev 模式生效(这个配置只会在 env: dev 生效)
  hot: {Boolean} 是否启用热更新, 无需配置, 框架处理
  hash: {Boolean} 是否hash, 无需配置, 框架处理
  miniJs: {Boolean} 是否压缩js, 无需配置, 框架处理
  miniCss: {Boolean} 是否压缩css, 无需配置, 框架处理
  miniImage: {Boolean} 是否压缩image, 无需配置, 框架处理
  cssExtract: {Boolean} 是否extract css, 无需配置, 框架处理
  cssModule: {Array} 指定那些文件使用css module, 无默认, 自己根据需要配置
  lib :['react', 'react-dom'] 非必需, Array／Object, 配置需要打包出 webpack commonsChunk 的库或者公共 js 文件
  */
};