import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function removeCategoryById(id) {
  return axios({
    method: 'DELETE',
    url: `${BASE_URL}/${id}`,
  })
    .then((response) => response.data, message.success('Категория удалена!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
