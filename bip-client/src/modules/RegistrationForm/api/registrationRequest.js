import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'
import { message } from 'antd'

export async function userRegistration(registrationData) {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: registrationData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      (response) => response.data,
      message.success('Успешно зарегистрирован!')
    )
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
