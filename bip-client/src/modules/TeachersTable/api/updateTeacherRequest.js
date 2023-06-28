import { TEACHERS_URL } from '../../../constants/teachersUrl'
import { api } from '../../../api/interceptors'

export async function updateTeacherById(teacherData) {
  return api({
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
