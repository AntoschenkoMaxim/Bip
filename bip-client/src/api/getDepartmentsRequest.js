import { DEPARTMENTS_URL } from '../constants/departmentsUrl'
import { api } from './interceptors'

export async function getAllDepartments() {
  return api({
    method: 'GET',
    url: DEPARTMENTS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
