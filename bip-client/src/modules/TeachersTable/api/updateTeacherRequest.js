import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function updateTeacherById(teacherData) {
  return axios({
    method: 'PATCH',
    url: `${BASE_URL}/${teacherData.id}`,
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
