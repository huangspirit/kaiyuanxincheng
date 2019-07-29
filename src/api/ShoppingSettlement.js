import axios from './index'
// 下单
export const OrderCreater = (data) => {
  return axios.request({
    url: `/api-g/goods-b/orderCreater?access_token=${data.access_token}`,
    method: 'post',
    data: JSON.stringify(data),
    params: {}
  })
}
