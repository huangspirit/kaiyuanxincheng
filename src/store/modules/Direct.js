import {
  BrandDetail,
  CatergoryByParent,
  CategoryDetail,
  ScreenType,
  ScreenProductList,
  ScreenTotal
} from '@/api/BrandDetail'

const state = {
    directJOSN:{},
  ProductnformaList: [],
  total: 0,
  // 筛选的type列表
  screenTypeList: [],
  // 筛选总数
  ScreenProductTotal: 0,
  // 筛选列表
  ScreenProductList: []
}
const getters = {

}
const actions = {
  // 大搜索跳到二级目录

  GetSearchDirect ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      BrandDetail(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
          commit('GetSearchDirect', res.data)
        }
      })
    })
  },
  // 二级类列表信息
  GetDirectList ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      CategoryDetail(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
          commit('GetDirectList', res.data)
        } else reject(res.message)
      })
    })
  },

  // 筛选项
  GetScreenType ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      ScreenType(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
          commit('GetScreenType', res.data)
        } else reject(res.message)
      })
    })
  },
  // 筛选总数
  GetScreenTotal ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      ScreenTotal(data).then(res => {
        // resolve(res)
        commit('GetScreenTotal', res.data)
      })
    })
  },
  // 筛选结果
  GetScreenProductList ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      ScreenProductList(data).then(res => {
        resolve(res)
        commit('GetScreenProductList', res.data)
      })
    })
  }
}
const mutations = {
    savedirectJOSN(state,data){
        state.directJOSN=data
    },
  GetSearchDirect (state, data) {
    state.ProductnformaList = data.direct.data
    state.total = data.direct.total
  },
  GetDirectList (state, data) {
    state.ProductnformaList = data.data
    state.total = data.total
  },
  GetScreenType (state, data) {
    state.screenTypeList = data
  },
  GetScreenProductList (state, data) {
    state.ScreenProductList = data.data || []
  },
  GetScreenTotal (state, data) {
    state.ScreenProductTotal = data
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
