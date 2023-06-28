import { POST_CATEGORIES_URL } from '../../../constants/postCategoriesUrl'
import { api } from '../../../api/interceptors'

export async function removePostCategoryById(id) {
  return api({
    method: 'DELETE',
    url: `${POST_CATEGORIES_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
