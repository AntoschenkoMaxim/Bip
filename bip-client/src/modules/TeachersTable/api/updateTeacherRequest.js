import axios from 'axios'
import { TEACHERS_URL } from '../../../constants/teachersUrl'

export async function updateTeacherById(teacherData) {
  return axios({
    method: 'PATCH',
    url: `${TEACHERS_URL}/${teacherData.id}`,
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
