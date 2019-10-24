import axios from './index'
// QQ登录
export const QqLogin = () => {
  return axios.request({
    url: `api-u/qq/web/getScanCode`,
    method: 'get',
    data: {},
    params: {}
  })
}

// QQ轮训
export const QqSuccess = (state) => {
  return axios.request({
    url: `api-u/qq/getSuccess`,
    method: 'get',
    data: {},
    params: {
      state
    }
  })
}
// 发送验证码
export const QqSendCode = ({
  phone,
  type = 2
}) => {
  return axios.request({
    url: `/api-n/notification-anon/codes`,
    method: 'post',
    data: {},
    params: {
      phone,
      type
    }
  })
}
// 绑定手机号
export const QqBindPhone = ({
  phone,
  key,
  code,
  state,
  type = 'web',
  flag = false,
  wxSrc
}) => {
  return axios.request({
    url: `/api-u/users-anon/binding${wxSrc ? 'w' : 'q'}phone`,
    method: 'post',
    data: {},
    params: {
      phone,
      key,
      code,
      state,
      type,
      flag
    }
  })
}
export const QqSignIn = ({
  wxSrc,
  openid,
  state
}) => {
  return axios.request({
    url: `/sys/login-${wxSrc ? 'wechat' : 'qq'}`,
    method: 'post',
    data: {},
    params: {
      openid,
      state
    }
  })
}
// 手机短信
export const PhoneLoginCode = ({
  phone,
  type = 1
}) => {
  return axios.request({
    url: `/api-n/notification-anon/codes`,
    method: 'post',
    data: {},
    params: {
      phone,
      type
    }
  })
}
// 手机登录
export const PhoneLogin = ({
  phone,
  key,
  code,
  type = 'web'
}) => {
  return axios.request({
    url: `/api-u/users-anon/binding-phone`,
    method: 'post',
    data: {},
    params: {
      phone,
      key,
      code,
      type
    }
  })
}
// 手机登录
export const PhoneSignIn = ({
  phone,
  key,
  code
}) => {
  return axios.request({
    url: `/sys/login-sms`,
    method: 'post',
    data: {},
    params: {
      phone,
      key,
      code
    }
  })
}

// 获取用户信息
export const UserInforma = (
  //{
 // access_token
//}
) => {
  return axios.request({
    url: `/api-u/users/current`,
    method: 'get',
    // params:{
    //   access_token
    // }
  })
}

// 微信登陆
export const WxLogin = () => {
  return axios.request({
    url: `api-u/wechat/web/getScanCode`,
    method: 'get',
    data: {},
    params: {}
  })
}

// wx轮训
export const WxSuccess = (state) => {
  return axios.request({
    url: `api-u/wechat/getSuccess`,
    method: 'get',
    data: {},
    params: {
      state
    }
  })
}

//调微信

export const WxBack = ({
  code,
  state
}) => {
  return axios.request({
    url: `api-u/wechat/web/back`,
    method: 'get',
    data: {},
    params: {
      code,
      state
    }
  })
}
//获取底部导航列表
export const getFooterNav = (data) => {
  return axios.request({
    url: `api-b/webFront/queryWebConfigTitle`,
    params:data
  })
}
