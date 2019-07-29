import {
  BrandDetail,
  AllCategory,
  CategoryDetail,
} from '@/api/BrandDetail'
const state = {
  // 品牌信息
  brandInfo: {},
  // 品牌ID
  brandId: '',
  // 商品列表
  managementList: [],
  // 商品总数
  totalCount: 0,
  // 品类列表
  ProductnformaList: [],
  // 总数目
  total: 0,
  // 一级分类
  childrenList: []
}

const getters = {
  brandInfo (state) {
    return state.brandInfo
  },
  managementList (state) {
    return state.managementList
  },
  totalCount (state) {
    return state.totalCount
  },
  ProductnformaList (state) {
    return state.ProductnformaList
  },
  total (state) {
    return state.total
  },
  childrenList (state) {
    return state.childrenList
  }
}

const actions = {
  // 获取品牌详情
  GetBrandDetailData ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      BrandDetail(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
          commit('GetBrandDetailData', res.data)
        } else {
          this.$message({
            message: '请求错误!',
            type: 'warning'
          })
        }
      })
    })

  },
  // 获取全部品类
  GetAllCategory({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      AllCategory(data).then(res => {
        if (res.resultCode === '200') {
          resolve()
        }
        commit('GetAllCategory', res.data)
      })
    })
  },
  // 品类详细
  GetCategoryDetail({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      CategoryDetail(data).then(res => {

        commit('GetCategoryDetail', res.data)
      })
    })
  },

}

const mutations = {
  // 设置品牌id
  SetBrandId(state, data) {
    state.brandId = data.documentid
  },
  GetBrandDetailData(state, data) {
    state.brandInfo = data.brand
    state.childrenList = data.brand.childrenList
    state.totalCount = data.brand.count
  },
  GetAllCategory(state, data) {

    state.ProductnformaList = data.data
    state.total = data.total
  },
  GetCategoryDetail(state, data) {

    state.ProductnformaList = data.data
    state.total = data.total
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
