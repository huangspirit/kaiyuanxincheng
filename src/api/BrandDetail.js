// 品牌详情
import axios from './index'
// 品牌页数据
export const BrandDetail = (data) => {
  return axios.request({
    url: `api-g/gods-anon/searchResult`,
    method: 'get',
    data: {},
    params: {
      tag: data.tag,
      id: data.documentid,
      name: data.name,
      start: data.start,
      length: 10
    }
  })
}
// 全部品类
export const AllCategory = ({
  sort_filds = '',
  brandId,
  sort_type = 0,
  name = '',
  start,
  length = 10
}) => {
  return axios.request({
    url: `api-g/gods-anon/findGoodsBaseInfoAndExInfo`,
    method: 'get',
    data: {},
    params: {
      brandId,
      sort_filds,
      sort_type,
      start,
      name,
      length
    }
  })
}

// 品牌品类详情
export const CategoryDetail = ({
  first_id = '',
  parent_id = '',
  sort_filds = '',
  brandId,
  sort_type = 0,
  name = '',
  start,
  length = 10
}) => {
  return axios.request({
    url: `api-g/gods-anon/findGoodsBaseInfoAndExInfo`,
    method: 'get',
    data: {},
    params: {
      first_id,
      parent_id,
      sort_filds,
      brandId,
      name,
      start,
      length,
      sort_type
    }
  })
}

// 一级跳二级
export const CatergoryByParent = ({
  brandId,
  firstCatergoryId,
  start = 10,
  length = 10
}) => {
  return axios.request({
    url: `api-g/gods-anon/queryCatergoryByParentId`,
    method: 'get',
    data: {},
    params: {
      brandId,
      firstCatergoryId,
      start,
      length
    }
  })
}

// 筛选项
export const ScreenType = (data) => {
  return axios.request({
    url: `api-g/gods-anon/queryPropertyByParentId`,
    method: 'get',
    data: {},
    params: data
  })
}
// 筛选总数
export const ScreenTotal = ({
  map,
  start = 0,
  length = 10,
  brand_id = '',
  parent_id = '',
}) => {
  map['start'] = start
  map['length'] = length
  map['brand_id'] = brand_id
  map['parent_id'] = parent_id
  return axios.request({
    url: `api-g/gods-anon/queryMatchCount`,
    method: 'post',
    data: JSON.stringify(map)
  })
}
// 筛选结果
export const ScreenProductList = ({
  map,
  start = 0,
  length = 10,
  brand_id = '',
  parent_id = '',
}) => {
  map['start'] = start
  map['length'] = length
  map['brand_id'] = brand_id
  map['parent_id'] = parent_id
  return axios.request({
    url: `api-g/gods-anon/queryByProperty`,
    method: 'post',
    data: JSON.stringify(map)
  })
}



// 产品详情获取技术参数
export const QueryGoodsDatesheet = ({
  data
}) => {
  return axios.request({
    url: `/api-g/gods-anon/queryGoodsDatesheet`,
    method: 'get',
    data: {},
    params: data
  })
}
