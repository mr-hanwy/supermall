module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'commons': '@/commons',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

