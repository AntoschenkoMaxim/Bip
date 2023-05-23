import axios from 'axios'
import { LESSONS_URL } from '../../../constants/lessonsUrl'

export async function updateLessonById(lessonData) {
  return axios({
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
