import axios from 'axios'
import { POST_CATEGORIES_URL } from '../../../constants/postCategoriesUrl'

export async function updatePostCategoryById(categoryData) {
  const id = categoryData.id
  return axios({
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
