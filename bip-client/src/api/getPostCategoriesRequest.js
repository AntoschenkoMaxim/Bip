import axios from 'axios'
import { POST_CATEGORIES_URL } from '../constants/postCategoriesUrl'

export async function getAllPostCategories() {
  return axios({
    method: 'GET',
    url: POST_CATEGORIES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
