//const data = require('data/page_1_and_100.json')
import data from '../data/page_1_and_100.json'

export const getStarsApi = () => {
  //axios({
  //  url: 'https://api.github.com/users/zhangchengzheng91/starred?page=1&per_page=30',
  //  method: 'get',
  //})
  return new Promise(resolve => {
    resolve({ data })
  })
}
