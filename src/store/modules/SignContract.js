import {
  WeChatPay,
  PayStatus,
  QueryOrderTag,
  downLoadOrderContract,
  AlipayPagePay,
  QueryOrderInfo,
  subBankPayNumber
} from '@/api/SignContract'

const state = {

}

const getters = {

}

const actions = {
  //提交银行汇款编码
  submitBankPayNumber({commit},data){
    return new Promise((resolve, reject) => {
      subBankPayNumber(data).then(res => {
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
  //查询订单详情
  getQueryOrderInfo({commit},data){
    return new Promise((resolve, reject) => {
      QueryOrderInfo(data).then(res => {
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
  // 下单支付获取二维码
  GetWeChatPay({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      WeChatPay(data).then(res => {

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
  // 下单进行轮训
  GetPayStatus({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      PayStatus(data).then(res => {

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取是不是全款支付
  GetQueryOrderTag({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      QueryOrderTag(data).then(res => {
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
  // 下载
  GetdownLoadOrderContract({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      downLoadOrderContract(data).then(res => {
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
  // 支付宝支付
  GetAlipayPagePay({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      AlipayPagePay(data).then(res => {
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
}

const mutatioins = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutatioins
}
