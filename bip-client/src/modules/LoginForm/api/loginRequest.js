import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function loginUser(loginData) {
  console.log(loginData)
  return axios({
    method: 'POST',
    url: `${BASE_URL}`,
    data: loginData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => console.log(res.data))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
