import axios from 'axios'
import { POST_CATEGORIES_URL } from '../../../constants/postCategoriesUrl'

export async function removePostCategoryById(id) {
  return axios({
    method: 'DELETE',
    url: `${POST_CATEGORIES_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
