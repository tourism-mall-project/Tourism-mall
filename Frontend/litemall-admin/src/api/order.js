/* eslint-disable */
import request from '@/utils/request'
import Qs from 'qs'

export function listOrder(query) {
  return request({
    url: '/order/list',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

export function detailOrder(id) {
  return request({
    url: '/order/detail',
    method: 'get',
    params: { id }
  })
}

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

//商家查询全部订单：
export function allorder(data) {
  return request({
    url: '/admin/order/QueryShoplist',
    method: 'post',
    data
  })
}

//商家查询订单的详情：
export function orderDetail(id) {
  return request({
    url: '/admin/order/QueryShopOrder',
    method: 'post',
    params: { id }
  })
}

//商家查询金额总数：
export function myBalance(data) {
  return request({
    url: '/admin/stat/statOrderMoney',
    method: 'post',
    data
  })
}

//查询商品详情：
export function goodsDetails(id) {
  return request({
    url: '/admin/goods/detailGoodS',
    method: 'post',
    params: { id }
  })
}

//商品的删除：
export function deleteGoods(id) {
  return request({
    url: '120.79.250.63:8080/admin/goods/deleteShopGoods',
    method: 'post',
   	params: { id }
  })
}

//商品的添加：
export function creatGoods(data) {
  return request({
    url: '120.79.250.63:8080/admin/goods/creatgoods',
    method: 'post',
    data
  })
}




