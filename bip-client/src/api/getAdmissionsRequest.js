import { ADMISSIONS_URL } from '../constants/admissionsUrl'
import { api } from './interceptors'

export async function getAllAdmissions() {
  return api({
    method: 'GET',
    url: ADMISSIONS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
