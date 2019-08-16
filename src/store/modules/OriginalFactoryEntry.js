import {
  FindBrand,
  QueryDictionarieList,
  InsertBrandReview,
  InsertBrandInfoReview
} from '@/api/OriginalFactoryEntry'
const state = {
  active: 1,
  applyDetailEdit:{},
  //入驻的详细信息
  joinForm:localStorage.getItem('joinForm') ? JSON.parse(localStorage.getItem('joinForm')):{}
}

const getters = {

}

const actions = {
  // 模糊查询厂家GetFindBran
  GetFindBrand ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      FindBrand(data).then(res => {

        if (res.resultCode === '200') {
          resolve(res.data.data)
        }
      })
    })
  },
  // 查询下拉框
  GetQueryDictionarieList ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      QueryDictionarieList(data).then(res => {

        if (res.resultCode === '200') {
          resolve(res.data)
        }
      })
    })
  },
  // 添加入驻原厂
  GetInsertBrandReview ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      InsertBrandReview(data).then(res => {

        if (res.resultCode === '200') {
          resolve(res.message)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        
        reject(err)
      })
    })
  },
  // 添加厂家
  GetInsertBrandInfoReview ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      InsertBrandInfoReview(data).then(res => {

        if (res.resultCode === '200') {
          resolve(res)
        } else {
          reject(res.message)
        }
      })
    })
  }

}

const mutations = {
//点击添加入驻
  setJoinForm(state,obj){
   // console.log("obj:",obj)
    localStorage.setItem("joinForm",JSON.stringify(obj))
    state.joinForm=obj
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
