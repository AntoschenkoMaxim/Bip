import axios from 'axios'
import { CATEGORIES_URL } from '../constants/categoriesUrl'

export async function getAllCategories() {
  return axios({
    method: 'GET',
    url: CATEGORIES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
