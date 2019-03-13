module.exports = {
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // webpack-dev-server 相关配置
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.boyueba.com:8090',
        // target: 'http://127.0.0.1:5080',
        changeOrigin: true,
	      pathRewrite: {
		      '^/api': '/byb/api'
	      }
      }
    }
  }
}
