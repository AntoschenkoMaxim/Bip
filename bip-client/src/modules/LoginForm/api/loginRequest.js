import { LOGIN_URL } from '../constants/loginUrl'
import { message } from 'antd'
import { api } from '../../../api/interceptors'

export async function loginUser(loginData) {
  return api({
    method: 'POST',
    url: LOGIN_URL,
    data: loginData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      (response) => response.data.token,
      message.success('Успешно авторизован!')
    )
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
