/*
 * @Author: xuanyu
 * @Date: 2020-02-24 15:56:36
 * @LastEditTime: 2020-04-10 20:35:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog-admin/src/api/http.js
 */
import axios from 'axios'
import Vue from 'vue'
import router from '../router'
const http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  baseURL: 'http://121.42.14.221:3001/admin/api'
})
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  // eslint-disable-next-line no-console
  console.log(config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  
  return Promise.reject(err)
})

export default http