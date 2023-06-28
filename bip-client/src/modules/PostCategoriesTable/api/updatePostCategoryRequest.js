import { POST_CATEGORIES_URL } from '../../../constants/postCategoriesUrl'
import { api } from '../../../api/interceptors'

export async function updatePostCategoryById(categoryData) {
  const id = categoryData.id
  return api({
    method: 'PATCH',
    url: `${POST_CATEGORIES_URL}/${id}`,
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
