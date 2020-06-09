import axios from 'axios'


// 获取 star 列表
export const getUsersStaredApi = (username, options = { params: { per_page: 100 } }) =>
  axios.get(`https://api.github.com/users/${username}/starred`, options)
