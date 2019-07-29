// 买家订单管理
import axios from './index'
//查询物流信息
export const queryExpress = (data)=>{
  console.log(data)
  return axios.request({
    url: `api-order/customerCenter/queryExpress`,
    method: 'get',
    data: {},
    params: data
  })
}
// 获取全部的订单
export const BuyerOrderManagement = (data) => {
  return axios.request({
    url: `api-order/customerCenter/queryOrderPersonal`,
    method: 'get',
    data: {},
    params: data
  })
}
// 获取订单详情列表
export const BuyerOrderDetaileList = (data) => {
  return axios.request({
    url: `api-order/customerCenter/queryOrderInfoListForCustomer`,
    method: 'get',
    data: {},
    params: data
  })
}
// 订单进程
export const BuyerOrderOrderProcess = (data) => {
  return axios.request({
    url: `api-order/customerCenter/queryOrderOperation`,
    method: 'get',
    data: {},
    params: data
  })
}
// 取消订单
export const CancleOrderSubmit = (data) => {
  return axios.request({
    url: `api-order/customerCenter/cancelOrder`,
    method: 'get',
    data: {},
    params: data
  })
}
// 月结用户支付
export const BuyerOrdervipPay = (data) => {
  return axios.request({
    url: `api-order/customerCenter/vipPay`,
    method: 'get',
    data: {},
    params: data
  })
}
