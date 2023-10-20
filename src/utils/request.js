// import axios from 'axios'
import axios from './api'

export const login = (params) => {
  return axios({
    url: '/api/login',
    method: 'post',
    data: params
  })
}
// export const register = (params) => api.post('/api/register', params)
export const register = (params) => {
  return axios({
    url: '/api/register',
    method: 'post',
    data: params
  })
}

export const slideshow = () => {
  return axios({
    url: '/api/slideshow',
    method: 'get'

  })
}

// 天天特价
export const special = () => {
  return axios({
    url: '/api/dailySpecial',
    method: 'get'

  })
}

// 全部
export const whole = (params) => {
  return axios({
    url: '/api/whole',
    method: 'post',
    data: params

  })
}

// 狗狗
export const getKind = (params) => {
  return axios({
    url: '/api/kind',
    method: 'post',
    data: params
  })
}

// 加入购物车
export const cart = (params) => {
  return axios({
    url: '/api/cart',
    method: 'post',
    data: params
  })
}

// 获取购物车数据列表
export const getCart = (params) => {
  return axios({
    url: '/api/getCart',
    method: 'get',
    params: params
  })
}

// 购物车+1
export const cartAdd = (params) => {
  return axios({
    url: '/api/cartAdd',
    method: 'post',
    data: params
  })
}



export const del = (params) => {
  return axios({
    url: '/api/del',
    method: 'post',
    data: params
  })
}

export const getCartList = (params) => {
  return axios({
    url: '/api/getCartList',
    method: 'post',
    data: params
  })
}

export const cartOrder = (params) => {
  return axios({
    url: '/api/cartOrder',
    method: 'post',
    data: params
  })
}

export const getOrders = (params) => {
  return axios({
    url: '/api/getOrders',
    method: 'post',
    data: params
  })
}

// 删除订单记录
export const delOrder = (params) => {
  return axios({
    url: '/api/delOrder',
    method: 'post',
    data: params
  })
}

// 清空购物车
export const clearCarts = (params) => {
  return axios({
    url: '/api/clearCarts',
    method: 'post',
    data: params
  })
}

export const pay = (params) => {
  return axios({
    url: '/api/pay',
    method: 'post',
    data: params
  })
}

export const search = (params) => {
  return axios({
    url: '/api/search',
    method: 'post',
    data: params
  })
}



export const DailySpecialRound = () => {
  return axios({
    url: '/api/DailySpecialRound',
    method: 'get'

  })
}