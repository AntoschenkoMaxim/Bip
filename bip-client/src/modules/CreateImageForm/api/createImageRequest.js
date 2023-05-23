import axios from 'axios'
import { IMAGES_URL } from '../../../constants/imagesUrl'

export async function createImage(imageData) {
  return axios({
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
