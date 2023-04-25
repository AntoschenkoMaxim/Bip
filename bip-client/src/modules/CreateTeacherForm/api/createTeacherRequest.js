import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function createTeacher(teacherData) {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: teacherData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data, message.success('Успешно добавлен!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
