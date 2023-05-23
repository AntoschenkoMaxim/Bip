import axios from 'axios'
import { POST_CATEGORIES_URL } from '../../../constants/postCategoriesUrl'

export async function createPostCategory(categoryData) {
  return axios({
    method: 'POST',
    url: POST_CATEGORIES_URL,
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
