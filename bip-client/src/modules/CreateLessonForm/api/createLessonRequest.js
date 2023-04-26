import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function createLesson(lessonData) {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: lessonData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data, message.success('Предмет добавлен!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
