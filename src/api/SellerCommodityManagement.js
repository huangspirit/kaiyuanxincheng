// 卖家的商品管理
import axios from './index'
// 查询所有
export const PublishGoodsListByUser = (data) => {
  return axios.request({
    url: `api-g/goods-b/queryPublishGoodsListByUser`,
    method: 'get',
    data: {},
    params: data
  })
}

// 下架产品
export const UpdatePublishGoodsSatus = (data) => {
  return axios.request({
    url: `api-g/goods-b/updatePublishGoodsSatus?access_token=${data.access_token}`,
    method: 'post',
    data: JSON.stringify(data),
    params: {}
  })
}
