import {
  PersonalData,
  RefreshToken,
  Notification,
  InternalPhone,
  Queryphone,
  ReplacePhone,
  UnboundWeChat,
  GongZongCodes,
  CheckBind
} from '@/api/PersonalData'
import {
  UserInforma
} from '@/api/Login'
const state = {

}
const getters = {

}

const actions = {
  GetUserInforma({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      UserInforma(data).then(res => {
        resolve(res)
      })
    })
  },
  GetPersonalData({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      PersonalData(data).then(res => {
        resolve(res)
      })
    })
  },
  // 刷新token
  GetRefreshToken({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      RefreshToken(data).then(res => {
        resolve(res)
      })
    })
  },
  // 修改绑定的手机号
  GetNotification({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      Notification(data).then(res => {

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 验证二维码
  GetInternalPhone({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      InternalPhone(data).then(res => {
        
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 验证手机号是否被绑定
  GetQueryphone({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      Queryphone(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 替换新的手机号
  GetReplacePhone({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      ReplacePhone(data).then(res => {

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 解绑微信
  GetUnboundWeChat({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      UnboundWeChat(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 绑定微信
  GetGongZongCodes({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      GongZongCodes(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 绑定微信
  GetCheckBind ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      CheckBind(data).then(res => {
        resolve(res)
        // if (res.resultCode === '200') {
        //   resolve(res.data)
        // } else {
        //   reject(res.message)
        // }
      }).catch(err => {
        reject(err)
      })
    })
  },
}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
