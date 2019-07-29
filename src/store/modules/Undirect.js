import {
  BrandDetail,
  CatergoryByParent,
  CategoryDetail
} from '@/api/BrandDetail'
const state = {
  // 二级类列表信息
  ProductnformaList: [],
  // 总数目
  total: 0,
  parentName: '',
  parentId: '',
  brandName: '',
  // 二级分类总数目
  productTotal: 0,
  // 二级数目列表
  parentList: []
}

const getters = {
  ProductnformaList(state) {
    return state.ProductnformaList
  },
  total(state) {
    return state.total
  }
}
const actions = {

  // 一级跳二级
  GetUndirect({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      CatergoryByParent(data).then(res => {
        resolve(res)
        commit('GetUndirect', res)
      })
    })
  },
  // 二级类列表信息
  GetDirectList({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      CategoryDetail(data).then(res => {
        if (res.resultCode === '200') {
          resolve()
          commit('GetDirectList', res.data)
        } else reject(res.message)
      })
    })
  },
  // 大搜索跳到一级目录

  GetSearchDirect ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      BrandDetail(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
        }
        commit('GetSearchDirect', res.data)
      })
    })
  },
}

const mutations = {
  GetDirectList (state, data) {
    state.ProductnformaList = data.data
    state.total = data.total
  },
  GetUndirect (state, data) {
    state.productTotal = data.productTotal
    state.parentList = data.list
  },
  GetSearchDirect (state, data) {
    state.productTotal = data.undirect.productTotal
    state.parentList = data.undirect.list
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
