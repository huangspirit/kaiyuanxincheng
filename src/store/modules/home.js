// import {
//   SpecialOfferList,
//   HotSearchData,
//   findBrandList
//
// } from '@/api/home'
import {axios,home} from "@/api/apiObj";
const state = {
  // 特价直通车商品列表
  SpecialOfferList: [],
  // 分页总数
  OfferListTotal: 0,
  // 热搜的列表
  HotSearchList: [],
  // 厂家列表
  findBrandList: [],
  // 厂家总数
  BrandListTotal: 0
}

const getters = {
  SpecialOfferList (state) {
    return state.SpecialOfferList
  },
  OfferListTotal (state) {
    return state.OfferListTotal
  },
  HotSearchList (state) {
    return state.HotSearchList
  }
}

const actions = {
  // 获取热搜
  GetHotSearch ({
    commit
  },data) {
    return new Promise((resolve, reject) => {
        axios.request({...home.GetHotSearch,params:data}).then(
            res=>{
                resolve(res)
                commit('GetHotSearch', res)
            }
        )
    })
  },
  // 换一批获取特价直通车商品列表
  GetSpecialOfferList ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
        axios.request({...home.SpecialOfferList,params:data}).then(res=>{
              if (res.resultCode === '200') {
                resolve(res.data)
                commit('GetSpecialOfferList', res.data)
              } else reject(res.message)
        })
    })
  },
  // 获取所有厂家列表
  GetfindBrandList ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
        axios.request({...home.findBrandList,params:data}).then(res=>{
            if (res.resultCode === '200') {
                resolve(res.data)
              commit('GetfindBrandList', res.data)
            } else reject(res.message)
        })
    })
  }
}

const mutations = {
  GetSpecialOfferList (state, data) {
    state.SpecialOfferList = data.data
    state.OfferListTotal = data.total
  },
  GetHotSearch (state, data) {
    state.HotSearchList = data
  },
  GetfindBrandList (state, data) {
    state.findBrandList = data.data
    state.BrandListTotal = data.total
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
