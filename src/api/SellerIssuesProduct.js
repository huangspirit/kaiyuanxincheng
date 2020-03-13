// 发布商品
import axios from './index'
import Qs from 'qs'
//即使获取哟i能过户的信用额度
export const getSellerCredit = (data) => {
  return axios.request({
    url: `/api-u/users/querySellerCredit`,
    method: 'get',
    data: {},
    params: data
  })
}
// 交货地
export const SearchDataSelect = (data) => {
  return axios.request({
    url: `/api-g/goods-b/queryDictionarieList`,
    method: 'get',
    data: {},
    params: data
  })
}
// 查询商品

export const SerarchGoods = (data) => {
  return axios.request({
    url: `/api-g/goods-b/searchGoods`,
    method: 'get',
    data: {},
    params: data
  })
}

// 发布商品
export const PublishGoods = (data,token) => {
  return axios.request({
    url: `/api-g/goods-b/publish?access_token=${data.access_token}`,
    method: 'post',
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: {
      token:token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data,
    params: {}
  })
}
