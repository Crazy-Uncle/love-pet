import axios from "./api"

export const verify = (data) => {
  return axios({
    url: '/my/verify',
    method: 'post',
    data: data
  })
}

// 修改密码
export const changePassword = (data) => {
  return axios({
    url: '/my/changePassword',
    method: 'post',
    data: data
  })
}

// 获取收货地址数据
export const getAddressList = (data) => {
  return axios({
    url: '/api/getAddressList',
    method: 'post',
    data: data
  })
}

export const shippingAddress = (data) => {
  return axios({
    url: '/api/shippingAddress',
    method: 'post',
    data: data
  })
}

export const changeAddress = (data) => {
  return axios({
    url: '/api/changeAddress',
    method: 'post',
    data: data
  })
}

export const delAddress = (data) => {
  return axios({
    url: '/api/delAddress',
    method: 'get',
    params: data
  })
}

export const getUserMoney = (params) => {
  return axios({
    url: '/api/getUserMoney',
    method: 'get',
    params: params
  })
}