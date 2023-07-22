import { handleError } from '../helpers/handleError'
import { handleSuccess } from '../helpers/handleSuccess'
import { api } from './interceptors'

export async function getAllItems(url) {
  return api({
    method: 'GET',
    url,
  })
    .then(handleSuccess)
    .catch(handleError)
}
