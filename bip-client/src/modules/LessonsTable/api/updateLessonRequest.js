import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function updateLessonById(lessonData) {
  return axios({
    method: 'PATCH',
    url: `${BASE_URL}/${lessonData.id}`,
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
