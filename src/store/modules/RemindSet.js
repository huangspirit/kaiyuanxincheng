import {
  ReminderSet,
  ReminderUserSet,
  ReminderUserSetSubmit
} from '@/api/RemindSet'

const state = {

}

const getters = {

}

const actions = {
  GetReminderSet ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      ReminderSet(data).then(res => {
        if (res.resultCode === '200') {
          resolve(res)
        } else {
          reject(res.message)
        }
      })
    })
  },
  GetReminderUserSet ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      ReminderUserSet(data).then(res => {
       
        if (res.resultCode === '200') {
          resolve(res)
        } else {
          reject(res.message)
        }
      })
    })
  },
  GetReminderUserSetSubmit ({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      ReminderUserSetSubmit(data).then(res => {

        if (res.resultCode === '200') {
          resolve(res.message)
        } else {
          reject(res.message)
        }
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
