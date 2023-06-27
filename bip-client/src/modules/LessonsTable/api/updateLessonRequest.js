import { LESSONS_URL } from '../../../constants/lessonsUrl'
import { api } from '../../../api/interceptors'

export async function updateLessonById(lessonData) {
  return api({
    method: 'PATCH',
    url: `${LESSONS_URL}/${lessonData.id}`,
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
