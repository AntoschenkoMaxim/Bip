import { LESSONS_URL } from '../../../constants/lessonsUrl'
import { api } from '../../../api/interceptors'

export async function removeLessonById(id) {
  return api({
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
