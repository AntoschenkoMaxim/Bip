import { IMAGE_CATEGORIES_URL } from '../../../constants/imageCategoriesUrl'
import { api } from '../../../api/interceptors'

export async function removeImageCategoryById(id) {
  return api({
    method: 'DELETE',
    url: `${IMAGE_CATEGORIES_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
