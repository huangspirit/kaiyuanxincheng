import axios from './index'
// 根据提醒消息的类型查询
export const ReminderSet = (data) => {
  return axios.request({
    url: `api-u/reminderSettings/queryByType`,
    method: 'get',
    data: {},
    params: data
  })
}
// 设置用户提醒消息的类型
export const ReminderUserSet = (data) => {
  return axios.request({
    url: `api-u/userReminder/queryUserReminder`,
    method: 'get',
    data: {},
    params: data
  })
}

// 保存用户提醒消息的类型
export const ReminderUserSetSubmit = (data) => {
  return axios.request({
    url: `api-u/userReminder/setUserReminder?access_token=${data.accessToken}`,
    method: 'post',
    data: data.arr,
    params: {}
  })
}
