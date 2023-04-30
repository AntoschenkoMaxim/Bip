import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function createPost(postData) {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: postData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data, message.success('Новость добавлена!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
