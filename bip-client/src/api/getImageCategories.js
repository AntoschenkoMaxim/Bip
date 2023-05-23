import axios from 'axios'
import { IMAGE_CATEGORIES_URL } from '../constants/imageCategoriesUrl'

export async function getAllImageCategories() {
  return axios({
    method: 'GET',
    url: IMAGE_CATEGORIES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
