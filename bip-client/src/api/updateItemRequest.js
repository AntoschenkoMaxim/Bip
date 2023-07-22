import { handleError } from '../helpers/handleError'
import { handleSuccess } from '../helpers/handleSuccess'
import { api } from './interceptors'

export async function updateItemById(data, url) {
  const id = data?.id ? data.id : data.get('id')
  return api({
    method: 'PATCH',
    url: `${url}/${id}`,
    data: data,
  })
    .then(handleSuccess)
    .catch(handleError)
}
