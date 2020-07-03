import axios from 'axios'
import { Message } from 'element-ui'

// console.log(process.env)

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL:'/xxxxx',
  timeout: 12000
})

service.interceptors.request.use(
  config => {
    console.log(config)
    if (config.params && JSON.stringify(config.params) != '{}') {
      let params = ''
      Object.keys(config.params).forEach(item => {
        params += `&${item}=${encodeURIComponent(config.params[item])}`
      })
      config.url += '?' + params.substring(1)
      console.log(config)
      config.params = null
    }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.data.flag) {
      return response
    } else {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
