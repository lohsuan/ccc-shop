module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 3000
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ccc-shop/'
    : '/'
}
