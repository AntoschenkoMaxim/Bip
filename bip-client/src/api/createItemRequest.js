import { handleError } from '../helpers/handleError'
import { handleSuccess } from '../helpers/handleSuccess'
import { api } from './interceptors'

export async function createItem(data, url) {
  return api({
    method: 'POST',
    url: url,
    data: data,
  })
    .then(handleSuccess)
    .catch(handleError)
}
