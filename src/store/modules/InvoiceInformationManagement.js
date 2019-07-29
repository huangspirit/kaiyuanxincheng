import {
  AllPersonalInvoice,
  DelPersonalInvoice,
  AddPersonalInvoice,
  ChangePersonalInvoice,
  QueryUserBillById
} from '@/api/InvoiceInformationManagement'
const state = {
  AllPersonalInvoice: []
}

const getters = {

}

const actions = {
  // 查询所有发票
  GetAllPersonalInvoice({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      AllPersonalInvoice(data).then(res => {

        if (res.resultCode === '200') {
          commit('GetAllPersonalInvoice', res.data.data)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 新增发票
  GetAddPersonalInvoice({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      AddPersonalInvoice(data).then(res => {
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
  // 删除发票
  GetDelPersonalInvoice({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      DelPersonalInvoice(data).then(res => {

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
  // 修改个人发票
  GetChangePersonalInvoice({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      ChangePersonalInvoice(data).then(res => {

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
  // 根据id查发票
  GetQueryUserBillById({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      QueryUserBillById(data).then(res => {
        
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
  GetAllPersonalInvoice(state, data) {

    state.AllPersonalInvoice = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
