import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function createImage(imageData) {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: imageData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(
      (response) => response.data,
      message.success('Изображение добавлено!')
    )
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
