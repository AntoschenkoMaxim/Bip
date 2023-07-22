import { handleError } from '../helpers/handleError'
import { handleSuccess } from '../helpers/handleSuccess'
import { api } from './interceptors'

export async function removeItemById(id, url) {
  return api({
    method: 'DELETE',
    url: `${url}/${id}`,
  })
    .then(handleSuccess)
    .catch(handleError)
}
