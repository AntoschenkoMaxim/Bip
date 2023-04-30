import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function addLessonToDepartment(data) {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data, message.success('Предмет добавлен!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
