// 买家订单管理
import axios from './index'
//获取每个订单的详情列表
export const SellerOrderDetailList = (data) => {
    return axios.request({
        url: `/api-order/sellerCenter/queryOrderInfoListForSeller`,
        method: 'get',
        data: {},
        params: data
    })
}
// 获取全部的订单
export const SellerOrderManagement = (data) => {
  return axios.request({
    url: `api-order/sellerCenter/findGoodsSellerOrderManager`,
   // method: 'get',
    data: {},
    params: data
  })
}
// 获取订单详情列表
export const SellerOrderDetaileList = (data) => {
  return axios.request({
    url: `api-order/sellerCenter/queryOrderInfoListForSeller`,
    method: 'get',
    data: {},
    params: data
  })
}
// 获取订单进程
export const QueryGoodsOperationLog = (data) => {
  return axios.request({
    url: `api-order/sellerCenter/queryGoodsOperationLog`,
    method: 'get',
    data: {},
    params: data
  })
}
// 更改交期
export const UpdateSellerGoodsDiliverTime = (data) => {
  return axios.request({
    url: `api-order/sellerCenter/updateSellerGoodsDiliverTime`,
    method: 'get',
    data: {},
    params: data
  })
}
