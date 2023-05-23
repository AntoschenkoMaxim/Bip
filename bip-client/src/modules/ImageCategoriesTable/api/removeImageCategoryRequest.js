import axios from 'axios'
import { IMAGE_CATEGORIES_URL } from '../../../constants/imageCategoriesUrl'

export async function removeImageCategoryById(id) {
  return axios({
    method: 'DELETE',
    url: `${IMAGE_CATEGORIES_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
