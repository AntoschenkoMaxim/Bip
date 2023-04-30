import axios from 'axios'
import { LESSONS_URL } from '../constants/lessonsUrl'

export async function getAllLessons() {
  return axios({
    method: 'GET',
    url: LESSONS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
