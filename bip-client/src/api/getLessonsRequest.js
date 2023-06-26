import { LESSONS_URL } from '../constants/lessonsUrl'
import { api } from './interceptors'

export async function getAllLessons() {
  return api({
    method: 'GET',
    url: LESSONS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
