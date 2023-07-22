import { LOGIN_URL } from '../constants/loginUrl'
import { api } from '../../../api/interceptors'
import { handleError } from '../../../helpers/handleError'
import { handleSuccess } from '../../../helpers/handleSuccess'

export async function loginUser(loginData) {
  return api({
    method: 'POST',
    url: LOGIN_URL,
    data: loginData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleSuccess)
    .catch(handleError)
}
