import { IMAGE_CATEGORIES_URL } from '../../../constants/imageCategoriesUrl'
import { api } from '../../../api/interceptors'

export async function createImageCategory(categoryData) {
  return api({
    method: 'POST',
    url: IMAGE_CATEGORIES_URL,
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
