import axios from './index'
import Qs from 'qs'
// 模糊查询厂家
export const FindBrand = (data) => {
  return axios.request({
    url: `/api-g/gods-anon/findBrand`,
    method: 'get',
    data: {},
    params: data
  })
}
// 查询下拉框
export const QueryDictionarieList = (data) => {
  return axios.request({
    url: `/api-g/goods-b/queryDictionarieList`,
    method: 'get',
    data: {},
    params: data
  })
}
// 添加入驻原厂
export const InsertBrandReview = (data) => {
  return axios.request({
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [function (data) {
      data = JSON.stringify(data)
      return data
    }],
    url: `/api-b/factoryApply/insertFactoryApply?access_token=${data.access_token}`,
    method: 'post',
    data: data,
    params: {}
  })
}
// 添加厂家
export const InsertBrandInfoReview = (data) => {
  return axios.request({
    url: `api-b/goodsBrandInfoReview/insertGoodsBrandInfoReview?access_token=${data.access_token}`,
    method: 'post',
    data: JSON.stringify(data),
    params: {}
  })
}
