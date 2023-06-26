import { TEACHERS_URL } from '../constants/teachersUrl'
import { api } from './interceptors'

export async function getAllTeachers() {
  return api({
    method: 'GET',
    url: TEACHERS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
