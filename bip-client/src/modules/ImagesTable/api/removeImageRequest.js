import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function removeImageById(id) {
  return axios({
    method: 'DELETE',
    url: `${BASE_URL}/${id}`,
  })
    .then((response) => response.data, message.success('Изображение удалено!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
