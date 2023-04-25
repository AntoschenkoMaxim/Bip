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
      (res) => console.log(res.data),
      message.success('Successfully registration!')
    )
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
