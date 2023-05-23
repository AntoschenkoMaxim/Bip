import axios from 'axios'
import { LESSONS_URL } from '../../../constants/lessonsUrl'

export async function removeLessonById(id) {
  return axios({
    method: 'DELETE',
    url: `${LESSONS_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
