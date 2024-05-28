import axios from 'axios'
import { getCookie, removeCookie } from './auth'

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'
// 设置了axios的请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (getCookie('token')) {
      config.headers['Authorization'] = getCookie('token')
    }
    return config
  },
  (err) => {
    new Promise.reject(err)
  }
)
// 设置了axios的响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 421) {
      removeCookie('token')
    }
    return response.data
  },
  (err) => {
    Promise.reject(err)
  }
)

export default axios
