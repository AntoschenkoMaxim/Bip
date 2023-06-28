import { TEACHERS_URL } from '../../../constants/teachersUrl'
import { api } from '../../../api/interceptors'

export async function removeTeacherById(id) {
  return api({
    method: 'DELETE',
    url: `${TEACHERS_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}
