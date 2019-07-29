// 购物车
import axios from './index'
// 查询购物车
export const AllShoppingCartList = (data) => {
  return axios.request({
    url: `api-g/goodsBucket/goodsBucketList`,
    method: 'post',
    data: {},
    params: data
  })
}
