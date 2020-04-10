/*
 * @Author: xuanyu
 * @Date: 2020-04-10 19:18:56
 * @LastEditTime: 2020-04-10 19:54:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog-admin/vue.config.js
 */
module.exports = {
    // 打包部署路径配置
    publicPath:process.env.NODE_ENV === 'production'?'/admin/':'/',
    // 是否在开发环境下开启eslint,默认未true
    lintOnSave:process.env.NODE_ENV !== 'production',
    //如果不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。默认为true
    productionSourceMap:true,
    //服务配置
    // devServer:{
    //     host:'127.0.0.1',
    //     port:'8080',
    //     https:false,
    //     proxy:{
    //         '/admin/api':{
    //             target:'http://121.42.14.221:3001/admin/api',
    //             ws:true,
    //             changeOrigin: true
    //         }
    //     }
    // }
    
}