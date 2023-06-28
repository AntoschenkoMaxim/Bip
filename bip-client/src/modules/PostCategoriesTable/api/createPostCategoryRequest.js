import { POST_CATEGORIES_URL } from '../../../constants/postCategoriesUrl'
import { api } from '../../../api/interceptors'

export async function createPostCategory(categoryData) {
  return api({
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
