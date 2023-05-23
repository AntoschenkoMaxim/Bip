import axios from 'axios'
import { LESSONS_URL } from '../../../constants/lessonsUrl'

export async function createLesson(lessonData) {
  return axios({
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
