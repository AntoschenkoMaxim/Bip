import { IMAGES_URL } from '../../../constants/imagesUrl'
import { api } from '../../../api/interceptors'

export async function removeImageById(id) {
  return api({
    method: 'DELETE',
    url: `${IMAGES_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
