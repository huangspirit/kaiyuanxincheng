import {
  BrandDetail,
} from '@/api/BrandDetail'
const state = {
  // 产品信息
  goodsinfo: {},
  // 商品列表
  managementList: []
}

const getters = {
  goodsinfo(state) {
    return state.goodsinfo
  },
  managementList(state) {
    return state.managementList
  }

}

const actions = {
  // 获取产品详情
  GetGoodsDetailData({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      BrandDetail(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data.goodsinfo)
          commit('GetGoodsDetailData', res.data)
        } else reject(res.message)
      })
    })
  },
}
const mutations = {
  GetGoodsDetailData(state, data) {
    state.goodsinfo = data.goodsinfo
    // state.managementList = data.brand.list
    // state.totalCount = data.brand.totalCount
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
