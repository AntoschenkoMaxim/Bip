import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function createPost(postData) {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: postData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      (response) => response.data,
      message.success('Преподаватель добавлен!')
    )
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
