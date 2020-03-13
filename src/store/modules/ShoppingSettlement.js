import {
  OrderCreater,
} from '@/api/ShoppingSettlement'
// 收货地址
import {
  AllReceivingAddress,
  AddAddress,
  UpdateAddress,
  FindgAddressById
} from '@/api/ShippingAddress'
// 发票
import {
  AllPersonalInvoice,
  DelPersonalInvoice,
  AddPersonalInvoice,
  ChangePersonalInvoice
} from '@/api/InvoiceInformationManagement'
const state = {
  addressList: [],
  InvoiceList: []
}
const getters = {

}

const actions = {
  // 获取全部的收货地址
  GetAllReceivingAddress({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      AllReceivingAddress(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
          commit('GetAllReceivingAddress', res.data)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 添加新的收货地址
  GetAddAddress({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      AddAddress(data).then(res => {
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
  // 编辑时根据id查询
  GetFindgAddressById({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      FindgAddressById(data).then(res => {

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
  // 保存修改的地址
  GetUpdateAddress({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      UpdateAddress(data).then(res => {
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
  // 获取所有的发票
  GetAllPersonalInvoice({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      AllPersonalInvoice(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res.data)
          commit('GetAllPersonalInvoice', res.data)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  //下单
  GetOrderCreater({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      OrderCreater(data.data,data.token).then(res => {

        if (res.resultCode === '200') {
          resolve(res)
        } else {
          reject(res.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  //下单支付获取二维码
  GetWeChatPay ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      WeChatPay(data).then(res => {
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
  //下单进行轮训
  GetPayStatus ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      PayStatus(data).then(res => {
        resolve(1)
      }).catch(err => {
        reject(err)
      })
    })
  },
}

const mutations = {
  GetAllReceivingAddress(state, data) {
      if(data){
          state.addressList = data.data
      }else{
          state.addressList=[]
      }
  },
  GetAllPersonalInvoice(state, data) {
    state.InvoiceList = data.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
