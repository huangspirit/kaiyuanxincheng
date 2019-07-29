import {
  AllShoppingCartList
} from '@/api/shoppingCart'

const state = {
  active: 1
}
const getters = {

}

const actions = {
  GetAllShoppingCartList ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      AllShoppingCartList(data).then(res => {
        
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
