// vue.config.js
module.exports = {
  chainWebpack: (config) => {

    // A, remove the plugin
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    // or:
    // B. Alter settings:
    // config.plugin('prefetch').tap(options => {
    //   if (!options[0].fileBlacklist) options[0].fileBlacklist = []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
  }
}
// module.exports = {
//   chainWebpack: config => {
//     config.plugins.delete('prefetch');

//     // config.plugin('prefetch').tap(options => {
//     //   if (!options[0].fileBlacklist) options[0].fileBlacklist = []
//     //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
//     //   return options
//     // })
//   },
//   "devServer": {
//     "port": 3000
//   },
//   "configureWebpack": {
//     "resolve": {
//       "alias": {
//         "vue": "vue/dist/vue.runtime.esm.js"
//       }
//     }
//   },
//   "transpileDependencies": [
//     "vuetify"
//   ]
// }