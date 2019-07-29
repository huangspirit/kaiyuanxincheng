// 个人发票
import axios from './index'
// 分页查询个人发票
export const AllPersonalInvoice = ({
  start = 0,
  length = 10,
  access_token
}) => {
  return axios.request({
    url: `api-u/userBill/queryUserBill`,
    method: 'get',
    data: {},
    params: {
      start,
      length,
      access_token
    }
  })
}
// 新增个人发票
export const AddPersonalInvoice = (data) => {
  return axios.request({
    url: `api-u/userBill/insertUserBill?access_token=${data.access_token}`,
    method: 'post',
    data: JSON.stringify(data)
  })
}
// 删除个人发票
export const DelPersonalInvoice = (data) => {
  return axios.request({
    url: `api-u/userBill/deleteUserBillById?access_token=${data.access_token}`,
    method: 'post',
    data: {},
    params: data
  })
}
// 修改个人发票
export const ChangePersonalInvoice = (data) => {
  return axios.request({
    url: `api-u/userBill/updateUserBill?access_token=${data.access_token}`,
    method: 'post',
    data: JSON.stringify(data)
  })
}
// 根据id 查询
export const QueryUserBillById = (data) => {
  return axios.request({
    url: `api-u/userBill/queryUserBillById?access_token=${data.access_token}`,
    method: 'get',
    data: {},
    params: data
  })
}
