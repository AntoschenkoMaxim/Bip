import { api } from '../../../api/interceptors'
import { handleError } from '../../../helpers/handleError'
import { handleSuccess } from '../../../helpers/handleSuccess'

export async function getTeacherById(id, url) {
  return api({
    method: 'GET',
    url: `${url}/${id}`,
  })
    .then(handleSuccess)
    .catch(handleError)
}
