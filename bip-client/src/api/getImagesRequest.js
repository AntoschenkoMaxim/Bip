import axios from 'axios'
import { IMAGES_URL } from '../constants/imagesUrl'

export async function getAllImages() {
  return axios({
    method: 'GET',
    url: IMAGES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
