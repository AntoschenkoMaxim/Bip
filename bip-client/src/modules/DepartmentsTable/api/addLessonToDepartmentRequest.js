import { api } from '../../../api/interceptors'
import { handleError } from '../../../helpers/handleError'
import { handleSuccess } from '../../../helpers/handleSuccess'

export async function addLessonToDepartment(data, url) {
  return api({
    method: 'POST',
    url: url,
    data: data,
  })
    .then(handleSuccess)
    .catch(handleError)
}
