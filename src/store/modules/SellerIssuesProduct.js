import {
  SearchDataSelect,
  SerarchGoods,
  PublishGoods,
  getSellerCredit
} from '@/api/SellerIssuesProduct'
const state = {
  SellerCredit:0
}

const getters = {

}

const actions = {
  //查询用户的信用额度
  querySellerCredit({  commit
  }, data) {
    return new Promise((resolve, reject) => {
      getSellerCredit(data).then(res => {
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
  // 查询下拉框
  GetSearchDataSelect ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      SearchDataSelect(data).then(res => {
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
  // 模糊查询商品
  GetSerarchGoods ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      SerarchGoods(data).then(res => {
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
  // 发布商品
  GetPublishGoods ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      PublishGoods(data.data,data.token).then(res => {
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
