import {
  SellerOrderManagement,
  SellerOrderDetaileList,
  QueryGoodsOperationLog,
  UpdateSellerGoodsDiliverTime,
    SellerOrderDetailList
} from '@/api/SellerOrderManagement'

const state = {
  SellerOrderManagement: [],
  SellerOrderTotal: 0
}
const getters = {

}
const actions = {
    //获取每个订单的详情列表
    GetSellerOrderDetailList({
        commit
    },data){
        return new Promise((resolve, reject) => {
            SellerOrderDetailList(data).then(res => {
                if (res.resultCode === '200') {
                    resolve(res.data)
                }
            })
        })
    },
  // 全部订单
  GetSellerOrderManagement({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      SellerOrderManagement(data).then(res => {
        if (res.resultCode === '200') {
         // commit('GetSellerOrderManagement', res.data)
            resolve(res)
        }
      })
    })
  },
  // 列表
  GetSellerOrderDetaileList({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      SellerOrderDetaileList(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
        }
      })
    })
  },
  // 进程
  GetQueryGoodsOperationLog({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      QueryGoodsOperationLog(data).then(res => {
        console.log(res)
        if (res.resultCode === '200') {
          resolve(res)
        }
      })
    })
  },
  // 修改交期
  GetUpdateSellerGoodsDiliverTime ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      UpdateSellerGoodsDiliverTime(data).then(res => {
        console.log(res)
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
  // GetSellerOrderManagement (state, data) {
  //   state.SellerOrderManagement = data.data
  //   state.SellerOrderTotal = data.total
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
