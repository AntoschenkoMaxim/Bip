import { api } from '../../../api/interceptors'
import { DEPARTMENTS_LESSON_URL } from '../constants/departmentsLessonUrl'

export async function addLessonToDepartment(data) {
  return api({
    method: 'POST',
    url: DEPARTMENTS_LESSON_URL,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
