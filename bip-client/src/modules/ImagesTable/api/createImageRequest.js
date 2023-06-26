import { IMAGES_URL } from '../../../constants/imagesUrl'
import { api } from '../../../api/interceptors'

export async function createImage(imageData) {
  return api({
    method: 'POST',
    url: IMAGES_URL,
    data: imageData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
