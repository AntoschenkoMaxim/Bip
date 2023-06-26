import { POST_CATEGORIES_URL } from '../constants/postCategoriesUrl'
import { api } from './interceptors'

export async function getAllPostCategories() {
  return api({
    method: 'GET',
    url: POST_CATEGORIES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
