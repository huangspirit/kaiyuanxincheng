// 商家列表
import axios from './index'
export const MerchantList = (data) => {
  return axios.request({
    url: `/api-g/gods-anon/queryDirectGoods`,
    method: 'get',
    data: {},
    params: data
  })
}

// 下单
export const Order = (data) => {
  return axios.request({
    url: `/api-g/goods-b/orderCheck?access_token=${data.access_token}`,
    method: 'post',
    data: JSON.stringify(data),
    params: {}
  })
}
