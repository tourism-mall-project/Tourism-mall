/* eslint-disable */
import request from '@/utils/request'
import Qs from 'qs'

//查询所有订单
export function listOrder(query) {
  return request({
    url: '/order/QueryShoplist',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

// export function detailOrder(id) {
//   return request({
//     url: '/order/detail?id=',
//     method: 'get',
//     params: { id }
//   })
// }

export function shipOrder(data) {
  return request({
    url: '/order/ship',
    method: 'post',
    data
  })
}

export function refundOrder(data) {
  return request({
    url: '/order/refund',
    method: 'post',
    data
  })
}

export function replyComment(data) {
  return request({
    url: '/order/reply',
    method: 'post',
    data
  })
}


//商家查询订单的详情：
export function orderDetail(id) {
  return request({
    url: '/order/QueryShopOrder',
    method: 'get',
    params: { id }
  })
}




