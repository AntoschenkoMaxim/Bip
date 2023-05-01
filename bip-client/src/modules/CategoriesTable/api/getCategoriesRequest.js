import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function getAllCategories() {
  return axios({
    method: 'GET',
    url: BASE_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
