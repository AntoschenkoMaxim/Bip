import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function removeLessonById(id) {
  return axios({
    method: 'DELETE',
    url: `${BASE_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
