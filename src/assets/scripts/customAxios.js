import axios from 'axios'
// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.url = '/go' + config.url
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
export default axios
