import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function removeDepartmentById(id) {
  return axios({
    method: 'DELETE',
    url: `${BASE_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
