import { REGISTRATION_URL } from '../constants/registrationUrl'
import { message } from 'antd'
import { api } from '../../../api/interceptors'

export async function userRegistration(registrationData) {
  return api({
    method: 'POST',
    url: REGISTRATION_URL,
    data: registrationData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response, message.success('Успешно зарегистрирован!'))
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
