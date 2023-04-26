import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function removeDepartmentById(id) {
  return axios({
    method: 'DELETE',
    url: `${BASE_URL}/${id}`,
  })
    .then((response) => response.data, message.success('Кафедра удалена!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
