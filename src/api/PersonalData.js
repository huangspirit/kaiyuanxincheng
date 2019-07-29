import axios from './index'
import Qs from 'qs'
// 个人资料
export const PersonalData = (data) => {
  return axios.request({
    url: `api-u/users/me?access_token=${data.access_token}`,
    method: 'put',
    data: JSON.stringify(data),
    params: {}
  })
}

// 刷新token
export const RefreshToken = (data) => {
  return axios.request({
    url: `/sys/refresh_token?refresh_token=${data.refresh_token}`,
    method: 'post',
    data: JSON.stringify(data),
    params: {}
  })
}

// 修改绑定的手机号
export const Notification = (data) => {
  return axios.request({
    url: `/api-n/notification-anon/codes?access_token=${data.access_token}&type=${data.type}&phone=${data.phone}`,
    method: 'post',
    data: {},
    params: {}
  })
}

// 校验手机验证码
export const InternalPhone = (data) => {
  return axios.request({
    url: `/api-n/notification-anon/phone`,
    method: 'get',
    data: {},
    params: data
  })
}

// 校验手机号是否已被绑定
export const Queryphone = (data) => {
  return axios.request({
    url: `/api-u/users/queryphone?access_token=${data.access_token}`,
    method: 'get',
    data: {},
    params: data
  })
}
// 替换新的手机号
export const ReplacePhone = (data) => {
  return axios.request({
    url: `/api-u/users/replacePhone?access_token=${data.access_token}&key=${data.key}&code=${data.code}&phone=${data.phone}`,
    method: 'post',
    data: {},
    params: {}
  })
}

// 解绑微信
export const UnboundWeChat = (data) => {
  return axios.request({
    url: `/api-u/users/unboundWeChat`,
    method: 'get',
    data: {},
    params: data
  })
}

// 绑定微信
export const GongZongCodes = (data) => {
  return axios.request({
    url: `/api-u/wechat/bind/getGongZongCodes`,
    method: 'get',
    data: {},
    params: data
  })
}


// 绑定微信轮训
export const CheckBind = (data) => {
  return axios.request({
    url: `/api-n/notification/checkBind`,
    method: 'get',
    data: {},
    params: data
  })
}
