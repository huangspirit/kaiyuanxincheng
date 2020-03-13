import axios from './index'
// 下单
export const OrderCreater = (data,token) => {
  return axios.request({
    url: `/api-g/goods-b/orderCreater`,
    method: 'post',
    data: data,
    params: {},
    headers: {
      token:token
    },
  })
}
