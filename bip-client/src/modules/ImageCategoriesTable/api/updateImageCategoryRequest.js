import { IMAGE_CATEGORIES_URL } from '../../../constants/imageCategoriesUrl'
import { api } from '../../../api/interceptors'

export async function updateImageCategoryById(categoryData) {
  const id = categoryData.id
  return api({
    method: 'PATCH',
    url: `${IMAGE_CATEGORIES_URL}/${id}`,
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
