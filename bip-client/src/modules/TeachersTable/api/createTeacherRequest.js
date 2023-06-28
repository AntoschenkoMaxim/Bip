import { TEACHERS_URL } from '../../../constants/teachersUrl'
import { api } from '../../../api/interceptors'

export async function createTeacher(teacherData) {
  return api({
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
