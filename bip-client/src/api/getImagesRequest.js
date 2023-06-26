import { IMAGES_URL } from '../constants/imagesUrl'
import { api } from './interceptors'

export async function getAllImages() {
  return api({
    method: 'GET',
    url: IMAGES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
