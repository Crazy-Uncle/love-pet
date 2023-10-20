import { Message } from 'element-ui'
import axios from 'axios'


const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : 'http://120.55.93.225:3000',
  timeout: 1000

})
instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// interceptors axios的拦截器对象
instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, err => {
  // 请求发生错误时的处理 抛出错误
  Promise.reject(err)
})
let timer = null
instance.interceptors.response.use(res => {
  // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
  // res 是所有相应的信息

  if (res.data.status == 403) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    } else {
      Message({ message: res.data.message, type: 'error', duration: 1000 })
      timer = setTimeout(() => {
        window.localStorage.clear()
        window.location.reload()
      }, 1000)
    }
  }
  return Promise.resolve(res)
}, err => {
  // 服务器响应发生错误时的处理
  Promise.reject(err)
})

export default instance
