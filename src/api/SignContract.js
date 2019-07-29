import axios from './index'
//提交银行汇款编码
export const subBankPayNumber = (data)=>{
  return axios.request({
    url: `/api-order/customerCenter/uploadBankTransferNo`,
    method: 'post',
    data: data,
  })
}
//获取订单详情
export const QueryOrderInfo = (data) =>{
  return axios.request({
    url: `/api-order/customerCenter/queryOrderInfo`,
    method: 'get',
    data: {},
    params: data
  })
}
// 下单支付
export const WeChatPay = (data) => {
  return axios.request({
    url: `/api-order/wechat/getWechatPay?access_token=${data.access_token}&message_id=${data.message_id}&type=${data.type}`,
    method: 'post',
    data: data,
    params: {}
  })
}
// 获取二维码之后的轮训
export const PayStatus = (data) => {
  return axios.request({
    url: `/api-order/wechat/getPaySatus?access_token=${data.access_token}&orderno=${data.orderno}&messageid=${data.messageid}`,
    method: 'post',
    data: {},
    params: {}
  })
}
// 获取是不是全款订单的接口
export const QueryOrderTag = (data) => {
  return axios.request({
    url: `/api-order/customerCenter/queryOrderTag`,
    method: 'get',
    data: {},
    params: data
  })
}
// 客户上传订单合同
// export const uploadOrderContract = (data) => {
//   return axios.request({
//     url: `/api-order/personal/uploadOrderContract`,
//     method: 'get',
//     data: {},
//     params: data
//   })
// }
// 下载合同
export const downLoadOrderContract = (data) => {
  return axios.request({
    url: `/api-order/customerCenter/downLoad`,
    method: 'get',
    data: {},
    params: data
  })
}
// 支付宝支付
export const AlipayPagePay = (data) => {
  return axios.request({
    url: `api-order/alipay/pagePay?orderNo=${data.orderNo}&type=${data.type}&access_token=${data.access_token}`,
    method: 'post',
    data: {},
    params: {}
  })
}

