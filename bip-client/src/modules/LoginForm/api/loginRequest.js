import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function loginUser(loginData) {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: loginData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data, message.success('Успешно авторизован!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
