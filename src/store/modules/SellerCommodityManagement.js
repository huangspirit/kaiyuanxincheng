import {
  PublishGoodsListByUser,
  UpdatePublishGoodsSatus
} from '@/api/SellerCommodityManagement'

const state = {

}

const getters = {

}

const actions = {
  GetPublishGoodsListByUser({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      PublishGoodsListByUser(data).then(res => {
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
  GetUpdatePublishGoodsSatus({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      UpdatePublishGoodsSatus(data).then(res => {
        console.log(res)
        if (res.resultCode === '200') {
          resolve(res)
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

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations

}
