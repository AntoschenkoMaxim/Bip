import { IMAGE_CATEGORIES_URL } from '../constants/imageCategoriesUrl'
import { api } from './interceptors'

export async function getAllImageCategories() {
  return api({
    method: 'GET',
    url: IMAGE_CATEGORIES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
