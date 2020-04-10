/*
 * @Author: xuanyu
 * @Date: 2020-03-02 14:10:23
 * @LastEditTime: 2020-04-10 10:03:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog-web/plugins/axios.js
 */
export default function ({ $axios, redirect }) {
  
  // baseUrl
  $axios.setBaseURL('http://121.42.14.221:3001/web/api/')

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}