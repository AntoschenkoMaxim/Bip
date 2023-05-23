import axios from 'axios'
import { IMAGES_URL } from '../../../constants/imagesUrl'

export async function removeImageById(id) {
  return axios({
    method: 'DELETE',
    url: `${IMAGES_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
