import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function getTeacherById(id) {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/?${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
