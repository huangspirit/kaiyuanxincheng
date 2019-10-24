// 首页
import axios from './index'
// 大搜索
export const SearchData = (data) => {
  return axios.request({
    url: `api-g/gods-anon/searchIndex`,
    method: 'get',
    data: {},
    params:data
  })
}
// 热搜
export const HotSearchData = () => {
  return axios.request({
    url: `api-g/gods-anon/querySummaryHome`,
    method: 'get',
    data: {}
  })
}

// 换一批获取特价直通车商品列表
export const SpecialOfferList = (data) => {
  return axios.request({
    url: `api-g/gods-anon/queryDirectGoods`,
    method: 'get',
    data: {},
    params: {
      start: data.start,
      length: data.length,
      status: data.status
    }
  })
}
// 所有厂商列表
export const findBrandList = (data) => {
  return axios.request({
    url: `api-g/gods-anon/findBrand`,
    method: 'get',
    data: {},
    params: data
  })
}
