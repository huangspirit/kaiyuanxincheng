import {
  BuyerOrderManagement,
  BuyerOrderDetaileList,
  BuyerOrderOrderProcess,
  BuyerOrdervipPay,
  CancleOrderSubmit,
  queryExpress
} from '@/api/BuyerOrderManagement'
const state = {
  // 全部列表
  BuyerOrderManagementList: [],
  // 列表数量
  BuyerOrderManagementTotal: 0
}
const getters = {

}
const actions = {
  //查询物流
  queryExpress(
    {
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        queryExpress(data).then(res => {
          if (res.resultCode === '200') {
            resolve(res)
          }
        })
      })
  },
  
  // 全部订单
  GetBuyerOrderManagement({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      BuyerOrderManagement(data).then(res => {
        if (res.resultCode === '200') {
          commit('GetBuyerOrderManagement', res.data)
        }
      })
    })
  },
  // 全部订单
  GetBuyerOrderDetaileList({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      BuyerOrderDetaileList(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
        }
      })
    })
  },
  // 订单进程
  GetBuyerOrderOrderProcess({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      BuyerOrderOrderProcess(data).then(res => {

        if (res.resultCode === '200') {
          resolve(res)
        }
      })
    })
  },
  //取消订单
  CancleOrderSubmit({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      CancleOrderSubmit(data).then(res => {
       
          resolve(res)
       
      })
    })
  },
  // 月结支付
  GetBuyerOrdervipPay({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      BuyerOrdervipPay(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const mutations = {
  GetBuyerOrderManagement(state, data) {
    state.BuyerOrderManagementList = data.data
    state.BuyerOrderManagementTotal = data.total
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
