import axios from 'axios'
import { TEACHERS_URL } from '../../../constants/teachersUrl'

export async function createTeacher(teacherData) {
  return axios({
    method: 'POST',
    url: TEACHERS_URL,
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
