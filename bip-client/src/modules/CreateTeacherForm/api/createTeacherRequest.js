import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function createTeacher(teacherData) {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: teacherData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
