import {
  QqLogin,
  QqSuccess,
  QqSendCode,
  QqBindPhone,
  SignIn,
  PhoneLoginCode,
  PhoneLogin,
  PhoneSignIn,
  UserInforma,
  WxLogin,
  WxSuccess,
  WxBack,
  getFooterNav
} from '@/api/Login'

const state = {
  "UserInforma": sessionStorage.getItem("UserInforma") && sessionStorage.getItem("UserInforma")!="undefined" ?JSON.parse(sessionStorage.getItem("UserInforma")):{}
}
const getter = {

}

const actions = {
  // qq登录
  GetQqLogin ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      QqLogin().then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
        } else {
          reject(res.message)
        }
      }).then(err => {
        reject(err)
      })
    })
  },
  // qq轮训

  GetQqSuccess ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      QqSuccess(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
        } else {
          reject(res.message)
        }
      }).then(err => {
        reject(err)
      })
    })
  },

  // 发送验证码
  GetQqSendCode ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      QqSendCode(data).then(res => {
        resolve(res)
      }).then(err => {
        reject(err)
      })
    })
  },
  // 绑定手机号
  GetQqBindPhone ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      QqBindPhone(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // qq登录
  GetSignIn ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      SignIn(data).then(res => {
        resolve(res)
      }).then(err => {
        reject(err)
      })
    })
  },
  // 手机号登录
  GetPhoneLoginCode ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      PhoneLoginCode(data).then(res => {
        resolve(res)
      }).then(err => {
        reject(err)
      })
    })
  },
  GetPhoneLogin ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      PhoneLogin(data).then(res => {
        resolve(res)
      }).then(err => {
        reject(err)
      })
    })
  },
  GetPhoneSignIn ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      PhoneSignIn(data).then(res => {
        resolve(res)
      }).then(err => {
        reject(err)
      })
    })
  },
  // 获取用户信息
  GetUserInforma ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      UserInforma(data).then(res => {
        sessionStorage.setItem("UserInforma",JSON.stringify(res))
        commit('GetUserInforma', res)
       resolve(res)
      }).then(err => {
        reject(err)
      })
    })
  },
  // 微信登陆
  GetWxLogin ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      WxLogin(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
        } else {
          reject(res.message)
        }
      }).then(err => {
        reject(err)
      })
    })
  },
  // Wx轮训

  GetWxSuccess ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      WxSuccess(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
        } else {
          reject(res.message)
        }
      }).then(err => {
        reject(err)
      })
    })
  },
  // 调微信

  GetWxBack ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      WxBack(data).then(res => {
        if (res.resultCode === '200') {
          resolve()
        } else {
          reject(res.message)
        }
      }).then(err => {
        reject(err)
      })
    })
  },
  // 获取底部导航

  getfooterNav ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      getFooterNav(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
        } else {
          reject(res.message)
        }
      }).then(err => {
        reject(err)
      })
    })
  },
}

const mutations = {
  GetUserInforma (state, data) {

    state.UserInforma = data

  }
}

export default {
  namespaced: true,
  state,
  getter,
  actions,
  mutations
}
