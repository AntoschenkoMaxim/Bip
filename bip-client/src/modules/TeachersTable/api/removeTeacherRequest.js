import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function removeTeacherById(id) {
  return axios({
    method: 'DELETE',
    url: `${BASE_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data, message.success('Преподаватель удален!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
