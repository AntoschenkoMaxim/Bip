import { REGISTRATION_URL } from '../constants/registrationUrl'
import { message } from 'antd'
import { api } from '../../../api/interceptors'
import { handleSuccess } from '../../../helpers/handleSuccess'
import { handleError } from '../../../helpers/handleError'

export async function userRegistration(registrationData) {
  return api({
    method: 'POST',
    url: REGISTRATION_URL,
    data: registrationData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleSuccess)
    .catch(handleError)
}
