import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function updateCategoryById(categoryData) {
  return axios({
    method: 'PATCH',
    url: `${BASE_URL}/${categoryData.id}`,
    data: categoryData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
