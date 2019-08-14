// 收货地址
import axios from './index'
// 查询所有的收货的地址
export const AllReceivingAddress = ({
  start,
  length

}) => {
  return axios.request({
    url: `api-u/address/queryAllReceivingAddress`,
    method: 'get',
    data: {},
    params: {
      start,
      length

    }
  })
}
// 删除收货地址
export const DeleteAddress = (data) => {
  return axios.request({
    url: `api-u/address/deleteReceivingAddressById`,
    method: 'post',
    data: {},
    params: data
  })
}
// 编辑收货地址
export const FindAddress = (params) => {
  return axios.request({
    url: `api-u/address/findReceivingAddressById`,
    method: 'post',
    data: {},
    params: params
  })
}

// 保存修改的用户地址
export const UpdateAddress = (params) => {
  return axios.request({
    url: `api-u/address/updateReceivingAddress`,
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 新增地址
export const AddAddress = (params) => {
  return axios.request({
    url: `api-u/address/saveReceivingAddress`,
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 根据id  或者 uid查询收货地址
export const FindgAddressById = (data) => {
  return axios.request({
    url: `api-u/address/findReceivingAddressById`,
    method: 'get',
    data: {},
    params: data
  })
}
