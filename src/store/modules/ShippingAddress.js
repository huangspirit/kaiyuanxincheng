import {
    AllReceivingAddress,
    DeleteAddress,
    FindAddress,
    UpdateAddress,
    AddAddress
} from '@/api/ShippingAddress'
const state = {
    // 地址列表
    AddressList: []
}

const getters = {}


const actions = {
    // 获取地址列表
    GetAllReceivingAddress({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            AllReceivingAddress(data).then(res => {

                if (res.resultCode === '200') {
                    commit('GetAllReceivingAddress', res.data);
                    resolve(res.data)
                }
            })
        })
    },
    // 删除地址
    GetDeleteAddress({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            DeleteAddress(data).then(res => {
                if (res.resultCode === '200') {
                    resolve(res.message)
                }
            })
        })
    },
    // 编辑地址
    GetFindAddress({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            FindAddress(data).then(res => {

                if (res.resultCode === '200') {
                    resolve(res.data)
                }
            })
        })
    },
    // 保存修改的用户地址
    GetUpdateAddress({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            UpdateAddress(data).then(res => {

                if (res.resultCode === '200') {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
        })
    },
    // 新增地址
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
            }).then(err => {
                reject(err)
            })
        })
    }
}

const mutations = {
    GetAllReceivingAddress(state, data) {
        console.log(data)
        if (data != null) {
            state.AddressList = data.children
        }

    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
