import axios from "./api"

export const getUserList = (params) => {
  return axios({
    url: 'my/getUser',
    method: 'get',
    params: params
  })
}


export const save = (params) => {
  return axios({
    url: 'my/save',
    method: 'post',
    data: params
  })
}