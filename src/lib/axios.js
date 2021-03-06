import axios from 'axios'
import { Message} from 'element-ui';
import context from '../main.js'

import {
  baseURL
} from '@/config'
import Router from '@/router'
// axios.defaults.timeout = 5000000;
class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      params: {}
    }
    return config
  }
  distroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {}
  }
  interceptors(instance, url) {
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {

      }
      return config
    }, error => {
      // Message.error('请求超时!')
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const {
        data
      } = res
        return data
    }, error => {
      context.$loading(context.$store.state.loading).close();
      if (error.response.status === 401) {
        // 401 说明 token 验证失败
        // 可以直接跳转到登录页面，重新登录获取 token
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('refresh_token')
        sessionStorage.removeItem("loginState")
        sessionStorage.removeItem("UserInforma")
        Router.push({
          path: '/login'
        })
      } else if (error.response.status === 500) {
        // 服务器错误
        // do something
        return Promise.reject(error.response.data)
       }
       else if(error.response.status === 400){
         Message({
           type:'warning',
           message:error.response.data.message
         })
      }
      else {
        //返回 response 里的错误信息
        this.distroy(url)
        return Promise.reject(error.response.data)
      }
    })
  }
  request (options) {
      let contentType="application/json;charset=UTF-8"
      if(options.method=='get'){
          contentType='text/plain;charset=UTF-8'
      }
      if(options["Content-Type"]){
        contentType=options["Content-Type"]
      }
      
    let access_token=sessionStorage.getItem("access_token")
    const instance = axios.create()
    if(access_token){
      if(options.headers){
        options = Object.assign(this.getInsideConfig(),options,{headers: {
          'Content-Type': contentType,
          "Authorization" : "Bearer " + access_token,
          ...options.headers
        }})
      }else{
        options = Object.assign(this.getInsideConfig(),{headers: {
          'Content-Type': contentType,
          "Authorization" : "Bearer " + access_token,
        }}, options)
      }
    }else{
      options = Object.assign(this.getInsideConfig(), options)
    }

    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
