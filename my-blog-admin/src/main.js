import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "./assets/style/restcss.css" //样式重置
import "./assets/style/icon.css"
import Cookie from 'js-cookie'
import axios from "axios"
import http from "./api/http"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.prototype.$Cookie = Cookie
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
