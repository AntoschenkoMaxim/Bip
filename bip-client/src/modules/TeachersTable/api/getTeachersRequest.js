import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function getAllTeachers() {
  return axios({
    method: 'GET',
    url: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
