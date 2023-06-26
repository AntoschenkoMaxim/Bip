import { IMAGES_URL } from '../../../constants/imagesUrl'
import { api } from '../../../api/interceptors'

export async function updateImageById(imageData) {
  const id = imageData.get('id')
  return api({
    method: 'PATCH',
    url: `${IMAGES_URL}/${id}`,
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
