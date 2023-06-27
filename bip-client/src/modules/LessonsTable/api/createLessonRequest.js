import { LESSONS_URL } from '../../../constants/lessonsUrl'
import { api } from '../../../api/interceptors'

export async function createLesson(lessonData) {
  return api({
    method: 'POST',
    url: LESSONS_URL,
    data: lessonData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
