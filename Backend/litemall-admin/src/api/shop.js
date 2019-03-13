/* eslint disable */
import request from '@/utils/request'

// 查询全部商家
export function listshops(query) {
  return request({
    url: '/shop/Querylist',
    method: 'get',
    params: query
  })
}

// 商家删除
export function deleteshop(data) {
  return request({
    url: 'shop/delete',
    method: 'post',
    data
  })
}

// 商家添加
export function creatshop(data) {
  return request({
    url: 'shop/InputShop',
    method: 'get',
    data
  })
}

// 商家的详情
export function detailshop(id) {
  return request({
    url: '/shop/readOnlyShop',
    method: 'get',
    params: { id }
  })
}

// 商家修改
export function editshop(data) {
  return request({
    url: 'shop/updateShop',
    method: 'post',
    data
  })
}

export function listCatAndBrand() {
  return request({
    url: '/goods/catAndBrand',
    method: 'get'
  })
}
//
// export function publishGoods(data) {
//   return request({
//     url: '/goods/createGoods',
//     method: 'post',
//     data
//   })
// }
