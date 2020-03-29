import {
  MerchantList,
  beforeOrder,
  Order
} from '@/api/MerchantList'

const state = {
  MerchantList: [],
  buyOneGoodsDetail:localStorage.getItem("buyOneGoodsDetail")?localStorage.getItem("buyOneGoodsDetail"):"{}"
}

const getters = {

}

const actions = {
  BeforeGetOrder({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      beforeOrder(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
         // commit('GetMerchantList', res.data)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 下单
  GetOrder({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      Order(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
          commit('GetMerchantList', res.data)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取商家列表
  GetMerchantList({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      MerchantList(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
          commit('GetMerchantList', res.data)
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
  GetMerchantList(state, data) {
    state.MerchantList = data.data

  },
  setBuyOneGoodsDetail(state,data){
    //console.log("setBuyOneGoodsDetail:",data)
    state.buyOneGoodsDetail=data
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
